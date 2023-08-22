// noinspection JSCheckFunctionSignatures,JSUnusedAssignment
import HTML from '../../assets/icons/icons8-html-48.png'
import CSS from '../../assets/icons/icons8-css-48.png'
import JS from '../../assets/icons/icons8-js-48.png'
import BOT from '../../assets/icons/icons8-bootstrap-48.png'
import SASS from '../../assets/icons/icons8-sass-48.png'
import TAILWIND from '../../assets/icons/icons8-tailwindcss-48.png'
import REACT from '../../assets/icons/icons8-react-native-48.png'
import REDUX from '../../assets/icons/icons8-redux-48.png'
import PHP from '../../assets/icons/icons8-php-48.png'
import LARAVEL from '../../assets/icons/icons8-laravel-48.png'
import {useEffect, useState} from "react";
import {doc,getDoc, serverTimestamp} from 'firebase/firestore'
import useFiresotre from "../../Hooks/useFiresotre.js";
import {useParams} from "react-router-dom";
import {db} from "../../Firebase/index.js";
import * as tls from "tls";
import {BsPlusSquareFill} from "react-icons/bs";
import {GrFormClose} from "react-icons/gr";
const DProjectForm = () => {
    const [file,setFile] = useState(null)
    const [url,setUrl] = useState(null)
    const {addCollection} = useFiresotre()
    const {id} = useParams()
    const handlePhotochange = (e) => {
        setFile(e.target.files[0])
    }
    const imagePreview = (file)=>{
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            setUrl(reader.result)
        }
    }
    useEffect(()=>{
        if(file){
            imagePreview(file)
        }
    },[file])
    const [title,setTitle] = useState("");
    const [demo,setDemo] = useState("");
    const [github,setGithub] = useState("");
    const [description,setDescription] = useState("");
    const [skill,setSkill] = useState('')
    const [skills,setSkills] = useState([])
    const [loading,setLoading] = useState(false)
    const [edit,setEdit] = useState(false)
    const handlePost = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const data = {
            title:title,
            description:description,
            demo:demo,
            github:github,
            skills:skills,
            created_at:serverTimestamp()
        }
        const res = await addCollection(data,file)
        if (res){
            setTitle('')
            setDemo('')
            setGithub('')
            setDescription('')
            setUrl('')
            setLoading(false)
        }
    }
    const addSkills = () => {
      setSkills((prevState)=>[skill,...prevState])
    }
    const removeSkill = (skill) => {
        setSkills((prevState)=>prevState.filter((prev)=>prev!==skill))
    }
    useEffect(() => {
        if (id) {
            setEdit(true)
            const ref = doc(db,"projects",id)
            getDoc(ref).then(doc=>{
                if (doc.exists()){
                    const {image,title,demo,github,description,skills} = doc.data()
                    setUrl(image)
                    setTitle(title)
                    setDemo(demo)
                    setGithub(github)
                    setDescription(description)
                    setSkills(skills)
                }else {
                    console.log("not found")
                }
            })
        }else{
            setEdit(false)
        }
    }, []);
  return (
      <form onSubmit={handlePost}>
          <div className="relative flex items-center justify-center w-full mb-6">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      {url&&<img src={url} className='absolute inset-0 h-[256px] w-full object-cover' alt="dd"/>}
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">Click to upload</p>
                  </div>
                  <input onChange={handlePhotochange} id="dropzone-file" type="file" className="hidden" />
              </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
              <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} name="title" id="title" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="title" className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Title</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
              <input type="text"  value={demo} onChange={(e)=>setDemo(e.target.value)} name="project_demo" id="project_demo" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="project_demo" className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Demo</label>
          </div>
              <div className="relative z-0 w-full mb-6 group">
                  <input type="text"  value={github} onChange={(e)=>setGithub(e.target.value)} name="project_github" id="project_github" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="project_github" className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Github</label>
              </div>
          <div className="relative z-0 w-full mb-6 group">
              <textarea rows={7}  value={description} onChange={(e)=>setDescription(e.target.value)} name="description" id="description" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required></textarea>
              <label htmlFor="description" className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Description</label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
              <input type='text'  value={skill} onChange={(e)=>setSkill(e.target.value)} name="description" id="description" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2  appearance-none text-white border-gray-600  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
              <label htmlFor="description" className="peer-focus:font-medium absolute text-sm  text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-focus:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Project Skills</label>
              <button type={'button'} onClick={addSkills}>
                  <BsPlusSquareFill className='text-xl text-slate-200 absolute right-0'/>
              </button>
          </div>
          <ul className='flex flex-wrap gap-x-2 my-4'>
              {skills?.map(skill=><li className='bg-gray-300 rounded-3xl px-2 py-1' key={skill}>{skill} <GrFormClose className='inline-flex cursor-pointer' onClick={()=>removeSkill(skill)}/></li>)}
          </ul>
          <button type="submit" className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700">
              {edit?"update":"create"}
          </button>
      </form>
  )
}
export default DProjectForm