
const utils = {
  getUserId: () => {
    return localStorage.getItem('user_id') || null;
  },
  loginVerify: () => {
    
  },
  reorder: (list: Array<any>, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }
}

export default utils;