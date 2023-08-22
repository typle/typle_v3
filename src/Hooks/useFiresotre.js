import {db, storage} from "../Firebase/index.js";
import {useEffect, useState} from "react";
import {addDoc, collection, getDocs, limit, orderBy, query,doc,deleteDoc} from 'firebase/firestore'
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

const useFiresotre = () => {
    const getAllCollection = (colName) => {
        const [data,setData] = useState([])
        useEffect(() => {
            let ref = collection(db,colName)
            const q = query(ref,orderBy('created_at',"desc"))
            getDocs(q).then((docs)=>{
                let allData = [];
                docs.forEach(doc=>{
                    let getData = {id:doc.id,...doc.data()}
                    allData.push(getData)
                })
                setData(allData)
            })
        }, []);
        return data
    }
    const getCollectionByLimit = (colName,lit=5) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [data,setData] = useState([])
        useEffect(() => {
            let ref = collection(db,colName)
            const q = query(ref,limit(lit))
            getDocs(q).then((docs)=>{
                let limitDatas = [];
                docs.forEach(doc=>{
                    let limitData = {id:doc.id,...doc.data()}
                    limitDatas.push(limitData)
                })
                setData(limitDatas)
            })
        }, []);
        return data
    }
    const addCollection = async (data,file=null) => {
        let insertData ;
        if (file){
            let fileName = Date.now().toString()+"_____"+file.name
            let path = "/projects/"+fileName
            const storageRef = ref(storage,path)
            await uploadBytes(storageRef,file)
             let url = await getDownloadURL(storageRef)
            insertData = {image:url,...data}
        }else {
            insertData = {...data}
        }

        const ref1 = collection(db,"projects")
        return await addDoc(ref1, insertData);
    }
    const deleteDocument = async (colName, id) => {
        const ref = doc(db, colName, id)
        await deleteDoc(ref)
    }
    const updateDocument = () => {

    }
    return{getAllCollection,getCollectionByLimit,addCollection,updateDocument,deleteDocument}
}
export default useFiresotre