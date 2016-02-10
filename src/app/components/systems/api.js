export class API {

  static setSystem(system){
    let _storage = JSON.parse(global.localStorage.getItem("systems")) ;

    if (system.id){
      for (let _idx in _storage){
        if (_storage[_idx].id && _storage[_idx].id.toString() == system.id){
          _storage[_idx] = system;
        }
      }
    } else {
      _storage.push(Object.assign({
        id: _storage.length + 1
      }, system));
    }
    global.localStorage.setItem("systems", JSON.stringify(_storage));
  }

  static getSystemById(_id){
    return JSON.parse(global.localStorage.getItem("systems"))
      .find((el) => {
        return el.id && el.id.toString() == _id;
      });
  }

  static eraseESes(){
    global.localStorage.setItem("systems", JSON.stringify([]));
  }

  static getSystems(){
    return JSON.parse(global.localStorage.getItem("systems"));
  }
}
