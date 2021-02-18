
function getRandomValue(min, max){
    return  Math.floor(Math.random() * (max - min)) + min;
}


const app = Vue.createApp({
    data() {
        return {
            playerHealth : 100,
            monsterHealth : 100,
            currentRound: 0,
            winner: null,
            logs: []
        }
    },

    methods: {
        attackMonster() {
            this.currentRound ++;
            const attackValue = getRandomValue(5, 10);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addLog("player", "attack", attackValue);
        },

        restart(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logs = [];

        },

        surrender(){
            this.playerHealth = 0;
        },

        attackPlayer(){
            const attackValue = getRandomValue(8, 13);
            this.playerHealth -= attackValue;
            this.addLog("monster", "attack", attackValue);

        },

        specialAttackMonster(){
            this.currentRound ++;
            const attackValue = getRandomValue(10, 15);
            this.monsterHealth -= attackValue;
            this.addLog("player", "attack", attackValue);
            this.attackPlayer();
        },

        healPlayer(){
            this.currentRound ++;
            const healValue = getRandomValue(8, 13);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }
            else{
                this.playerHealth += healValue;
            }
            this.addLog("player", "heal", healValue);

            this.attackPlayer();
           
        },

        addLog(who, what, value){
            this.logs.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },

    computed: {
        monsterBarStyles() {
            if(this.monsterHealth < 0){
                this.monsterHealth = 0;
            }
            return {width: this.monsterHealth + '%'};
        },

        playerBarStyles(){
            if(this.playerHealth < 0){
                this.playerHealth = 0;
            }
            return {width: this.playerHealth + '%'};
        },

        isSpecialAttackOn(){
            return (this.currentRound % 3 != 0);
        },

        isHealOn(){
            return (this.currentRound % 3 != 0);
        }

    },

    watch: {
        playerHealth(value) {
                if(value <= 0 && this.monsterHealth <= 0 ){
                    // draw
                    this.winner = "draw";
                }
                else if(value<= 0){
                    // player lost
                    this.winner = "monster";

                }
        },

        monsterHealth(value) {
                if(value <=0 && this.playerHealth <= 0){
                    // draw
                    this.winner = "draw";

                }
                else if(value <=0 ){
                    //monster lost
                    this.winner = "player";

                }

        }

    }


});

app.mount('#game');