class Model{

      constructor(observers=[], firebaseData=null, music=null, showNavbarCredentials=true){
            this.observers = observers;
            this.firebaseData = firebaseData;
            this.music = music;
            this.showNavbarCredentials = showNavbarCredentials;
      }

      setShowNavCredentials(bool) {
            this.showNavbarCredentials = bool;
            this.notifyObservers();
      }

      setMusic(music) {
            this.music = music;
            this.notifyObservers();
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