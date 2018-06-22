const EventEmitter = require('events').eventEmitter;

class countdown extends EventEmitter{
    constructor(seconds,superstitious){
        super();
        this.seconds = seconds;
        this.superstitious = !!superstitious
    }
    go(){
        const countdown = this;
        const timeoutIds = [];
        return new Promise(function(resolve,reject){
            for(let i = countdown.seconds;i>=0;i--){
                timeoutIds.push(setTimeout(function(){
                    if(countdown.superstitious&&i===13){
                        timeoutIds.forEach(clearTimeout)
                        return reject(new Error('oh my god'));
                    }
                    countdown.emit('tick',i);
                    if(i===0) resolve();
                }, (countdown.seconds-i)*1000));
            }
        })
    }
}

const p = new countdown(5)
p.go().then(function(){
    console.log('go');
}).catch(function(err){
    console.error(err.message);
})