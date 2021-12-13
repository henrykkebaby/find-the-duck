class Model{

      constructor(observers=[], firebaseData=null){
            this.observers = observers;
            this.firebaseData = firebaseData;
      }

      setfirebaseData(incomingData) {
            this.firebaseData = incomingData;
            this.notifyObservers();
      }

      addFirebaseData(incomingData) {
            this.firebaseData.push(incomingData);
            this.notifyObservers();
      }

      addObserver(callback)
      {
            this.observers.push(callback);
      }

      removeObserver(callback)
      {
            this.observers = this.observers.filter(ob => callback.toString() !== ob.toString());
      }
      
      notifyObservers()
      {
            this.observers.forEach(cb => cb());
      }
  
};

export default Model;