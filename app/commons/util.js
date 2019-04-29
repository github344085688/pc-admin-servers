module.exports = {
    insertSQLToString(array){
        let poremValues = _.toString(_.memoize(_.values)(array)).replace(/,/g, "','");
        poremValues = poremValues.slice(0, 0) + "('" + poremValues + poremValues.slice(poremValues.length, poremValues.length + 1) + "')";
        return poremValues
    },
    updateSQLToString(tableKey,updateData){
         let keys =_.intersection( _.keys(updateData[0]),tableKey);
        let fiterTitle = {};
        _.forEach(keys,(item)=>{
            let arry=[]
            _.forEach(updateData,(title=>{
                arry.push({'id':title['id'],'val':title[item]});
            }))
            fiterTitle[item]=arry
        });
        let updatas =[];
        _.forEach(fiterTitle,(val,key)=>{
            let chin=`${key} = CASE id `;
            _.forEach(val,(item)=>{
                chin+=`WHEN ${item.id} THEN '${item['val']}'`
            })
            chin+='END'
            updatas.push(chin);
        })
        return _.toString(updatas)
    },
}