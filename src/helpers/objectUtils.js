
const deletedFalsys = (obj={}) => {
    const newObj = 
        Object
        .entries(obj)
        .reduce((acc, [key, value]) => {
            if (value) acc[key] = value
            return acc;
        }, {});
    return newObj;
};

export { 
    deletedFalsys 
}