export class API {
  get_from_ls(key){
    return global.localStorage.get(key);
  }

  save_to_ls(key, value){
    let _value;
    if (typeof value === 'string' || value instanceof String){
      _value = value;
    } else {
      _value = JSON.stringify(value);
    }
    global.localStorage.set(key, _value);
  }

}
