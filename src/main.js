// Не забудьте перед отправкой изменить в module.exports = function main(game, start) {
// Не деструктурируйте game, ваше решение не будет проходить тесты.
export default function main(game, start) {
    let arr = new Array(50);
    for (let i = 0; i < arr.length; i++){
        arr[i] = new Array(50);
    }
    for (let i = 0; i < arr.length; i++){
        for (let j = 0; j < arr.length; j++){
            if(j>30 || i > 40){
                arr[j][i] = -1
            }
        }
    }
    arr[0][0]=1;
    const move = async(xx,yy) =>{
        let st = await game.state(xx,yy);
        if(arr[25][25]!=1){
            if (st.right === true && arr[yy][xx+1]==undefined){
                arr[yy][xx+1] = 1;
                await game.right(xx,yy).then(() => ({ x: xx+1, y: yy }));
                move(xx+1,yy);
            }
            if (st.bottom === true && arr[yy+1][xx]==undefined){
                arr[yy+1][xx] = 1;
                await game.down(xx,yy).then(() => ({ x: xx, y: yy + 1 }));
                move(xx,yy+1);
            }
            if (st.left === true && arr[yy][xx-1]==undefined){
                arr[yy][xx-1] = 1;
                await game.left(xx,yy).then(() => ({ x: xx-1, y: yy }));
                move(xx-1,yy);
            }
            if(st.start || st.finish){
                arr[yy][xx]=1;
            }else arr[yy][xx]=-1;
        }
    }
    const mainF = async() =>{
        let rez = [];
        await move(0,0);
        for (let i = 0; i < arr.length; i++){
            for (let j = 0; j < arr.length; j++){
                if(arr[j][i]==1){
                    rez.push({x:i,y:j});
                }
            }
        }
        for (let i = 0; i < rez.length; i++){
            let ot = await game.state(rez[i].x, rez[i].y);
            if(ot.finish){
                let st = await game.state(rez[i].x,rez[i].y).then(() => ({ x: rez[i].x, y: rez[i].y }));
                return st;
            }
        }
        return mainF();
        
    }
    return mainF();
}
