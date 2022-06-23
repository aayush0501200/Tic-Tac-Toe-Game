window.addEventListener("DOMContentLoaded",()=>{
    const tiles=Array.from(document.querySelectorAll(".tile"));
    const playerdisplay=document.querySelector(".display-player");
    const resetButton=document.querySelector("#reset");
    const announcer=document.querySelector(".announcer");
    
    let board=["","","","","","","","",""];
    let currentplayer="X";
    let isGameActive=true;

    const PlayerX_Won="PlayerX_Won"
    const PlayerO_Won="PlayerO_won"
    const TIE="TIE"

    const winningConditions=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    function handelResultValidation(){
        let roundWon=false;
        console.log(currentplayer)
        for (let i=0;i<=7;i++){
            const winCondition=winningConditions[i];
            const a=board[winCondition[0]];
            const b=board[winCondition[1]];
            const c=board[winCondition[2]];
            if (a==="" || b===""|| c===""){
                continue;
            }
            if (a===b && b==c){
                roundWon=true;
                break;
            }
        }
        if (roundWon){
            announce(currentplayer==="X" ? PlayerX_Won : PlayerO_Won);
            isGameActive=false;
            return ;
        }
        if (!board.includes(""))
            announce(TIE);
    }
    const announce=(type)=>{
        switch(type){
            case PlayerO_Won:
                announcer.innerHTML="Player<span class= 'playerO' >O</span> Won";
                break
            case PlayerX_Won:
                announcer.innerHTML="Player<span class= 'playerX' >X</span> Won";
                break
            case TIE:
                announcer.innerText="TIE";
        }
        announcer.classList.remove("hide");

    }
    const isValidAction=(tile)=>{
        if (tile.innerText==="X" || tile.innerText==="O"){
            return false;
        }
        return true;
    }
    const updateBoard=(index)=>{
        board[index]=currentplayer;
    }
    const changePlayer=()=>{
        playerdisplay.classList.remove("player${currentplayer}");
        currentplayer=currentplayer==="X" ? "O" : "X";
        playerdisplay.innerText=currentplayer;
        playerdisplay.classList.add("player${currentplayer}");



    }
    const useraction=(tile,index)=>{
        if (isValidAction(tile) && isGameActive){
            tile.innerText=currentplayer;
            tile.classList.add("player${currentplayer}");
            updateBoard(index);
            handelResultValidation();
            changePlayer();
        }
    }
    const resetBoard=()=>{
        board=["","","","","","","","",""];
        console.log(currentplayer)
        isGameActive=true;
        announcer.classList.add("hide");
  
        if (currentplayer==="O"){
            changePlayer();
        }

        tiles.forEach(tile=>{
            tile.innerText="";
            tile.classList.remove("playerX");
            tile.classList.remove("playerO");
        });

    }
    tiles.forEach((tile,index)=>{
        tile.addEventListener("click",() => useraction(tile,index));
    })
    resetButton.addEventListener("click",resetBoard);
})