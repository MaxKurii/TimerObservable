export class Observable {
  constructor(functionThatTakesObserver){
      this.isWait = false;
      this.time = 0;
      this.stopTime = 0;
      this._functionThatTakesObserver = functionThatTakesObserver;
      this.interval = 0
  }

  start(updateState){
      return setInterval(() => {
          if(!this.isWait)
          this.time+=100;
          updateState(this.time);
      }, 100);
  }

  reset(updateState, id){
      this.isWait = false;
      clearInterval(id);
      this.time = 0;
      return setInterval(() => {
          this.time+=100;
          updateState(this.time);
      }, 100);
  }

  stop(updateState, id){
      clearInterval(id);
      this.stopTime = this.time;
      this.time = 0;
      updateState(this.time)
      console.log(this.stopTime);
      this.isWait = false;
  }

  wait(obj){
      obj.isWait = !obj.isWait;
  }

  subscribe(observer) {
    return this._functionThatTakesObserver(observer);
  }
}