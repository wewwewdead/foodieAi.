import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { uploadFood, saveData } from "../services/api";
import Navbar from "./navbar";
import Footer from "./footer";
import { ClipLoader } from 'react-spinners';
import { motion, setDragLock } from "framer-motion";
import supabase from "../client/supabase.js";
import { p } from "framer-motion/client";


const FeedPage = ()=> {
    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState('');
    const [errorMessage, setErrorMessage] = useState('')
    const [imagePreview, setImagePreview] = useState('');
    const [noFood, setNoFood] = useState('');
    const [showContent, setShowContent] = useState(false);
    const [welcomeMessage, setWelcomeMessage] = useState('Upload or take a snap of your food so I can analyze it')

    const[nutrientsText, setNutrientsText] = useState('')
    const[benefitsText, setBenefitsText] = useState('')
    const[drawBacksText, setDrawBacksText] = useState('')
    const[nutrientsCurrentIndex, setNutrientsCurrentIndex] = useState(0);
    const[benefitsCurrentIndex, setBenefitsCurrentIndex] = useState(0);
    const[drawBacksCurrentIndex, setDrawBacksCurrentIndex] = useState(0);

    const [switchButton, setSwitchButton] = useState(false);
    const [analyzing, setAnalyzing] = useState(false)//loading state
    const [sumbiting, setSubmitting] = useState(false)//loading state
    const [isVisible, setIsVisible]= useState(true); // visibe state of the save button

    const [session, setSession] = useState(null);

    const fileRef = useRef(null);
    const contentRef = useRef(null)
    const navigate = useNavigate();

    const typingSpeed = 50 //miliseconds per character

    const fetchUser = async() => {
        const {data: {session}} = await supabase.auth.getSession();
        console.log(session)
        setSession(session)    
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const handleCancel = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        if(!session){
            return navigate('/login');
        }
        setIsVisible(false);
    }

    const handleSave = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        // console.log('save clicked')
        if(!session){
            return navigate('/login');
        }
        setSubmitting(true)
        const data = {
            cal: analysis.calories,
            sugar: analysis.sugar,
            carbs: analysis.carbs,
            foodName: analysis.food,
            userId: session.user.id
        }
        const {success} = await saveData(data);
        setSubmitting(false);
    }

    const handleClickUpload = (e) =>{
        e.preventDefault();
        if(fileRef.current){
            setFile(null)
            setErrorMessage('')
            setImagePreview('')
            setAnalysis('')
            setNoFood('')
            setSwitchButton(false)
            fileRef.current.value = ''
            fileRef.current.click();
        }
    }

    const handleImageChange = (e) =>{
        e.preventDefault();
        const file = e.target.files[0];
        setFile(file)

        if(file){
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setImagePreview(reader.result);
            }

            reader.readAsDataURL(file)
        } else {
            setImagePreview('')
        }
    }
    const newPhoto = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        
        if(fileRef.current){
            setSwitchButton(!switchButton);
            setNoFood('')
            setImagePreview('')
            setAnalysis('')
            setFile(null)
            fileRef.current.value = ''
            fileRef.current.click();
        }
    }

    const handleSubmit = async (e) => {
        setSwitchButton(!switchButton)
        setAnalyzing(true)
        e.preventDefault();
        setWelcomeMessage('')
        setShowContent(true)
        setErrorMessage('')
        setAnalysis('')
        setNutrientsText('');
        setBenefitsText('');
        setDrawBacksText('');
        setNutrientsCurrentIndex(0);
        setBenefitsCurrentIndex(0);
        setDrawBacksCurrentIndex(0);
        const formData = new FormData();
        if(!file){
            setErrorMessage('Please upload a photo of your food!')
            setSwitchButton(false)
            setAnalyzing(false)
            return;
        }
        formData.append("image", file);
      
        try {
          const data = await uploadFood(formData);
          
          if(data.analysis.fallback){
            setNoFood(data.analysis.fallback)
            return console.log(data.analysis)
          }
          console.log(data.analysis)
          setAnalysis(data.analysis)
        } catch (error) {
          console.error("Upload error:", error.message);
        } finally {
            setAnalyzing(false)
        }
      };

      useEffect(()=>{
        window.scrollTo(0, 0)
      }, [])
      
      useEffect(()=>{
        if(contentRef.current && showContent){
            contentRef.current.scrollIntoView({behavior: 'smooth'})
        }
      }, [showContent, analysis])

      useEffect(() => {
        let timer;
    
        // handle nutrients text rendering
        if (analysis) {
            if (nutrientsCurrentIndex < analysis.nutrients?.length && //checking if the nutrients array is all written
                nutrientsText.length < analysis.nutrients[nutrientsCurrentIndex]?.length) { //checking if nutrients text is all written
                timer = setTimeout(() => {
                    setNutrientsText((prevText) => prevText + analysis.nutrients[nutrientsCurrentIndex].charAt(nutrientsText.length)); //using charAt(using the length of nutrientsText for getting the current index) for adding 1 letter at a time for 50milisecs
                }, typingSpeed);
            } else if (nutrientsText.length >= analysis.nutrients?.[nutrientsCurrentIndex]?.length) {
                setNutrientsCurrentIndex((prevIndex) => prevIndex + 1);
                setNutrientsText('')
            }
    
            // handle benefits text rendering
            if (benefitsCurrentIndex < analysis.benefits?.length && 
                benefitsText.length < analysis.benefits[benefitsCurrentIndex]?.length) {
                timer = setTimeout(() => {
                    setBenefitsText((prevText) => prevText + analysis.benefits[benefitsCurrentIndex].charAt(benefitsText.length));
                }, typingSpeed);
            } else if (benefitsText.length >= analysis.benefits?.[benefitsCurrentIndex]?.length) {
                setBenefitsCurrentIndex((prevIndex) => prevIndex + 1); 
                setBenefitsText('')
            }
    
            // handle drawbacks text rendering
            if (drawBacksCurrentIndex < analysis.drawbacks?.length && 
                drawBacksText.length < analysis.drawbacks[drawBacksCurrentIndex]?.length) {
                timer = setTimeout(() => {
                    setDrawBacksText((prevText) => prevText + analysis.drawbacks[drawBacksCurrentIndex].charAt(drawBacksText.length));
                }, typingSpeed);
            } else if (drawBacksText.length >= analysis.drawbacks?.[drawBacksCurrentIndex]?.length) {
                setDrawBacksCurrentIndex((prevIndex) => prevIndex + 1); 
                setDrawBacksText('')
            }
        }
        return () => clearTimeout(timer);
    }, [typingSpeed, nutrientsCurrentIndex, benefitsCurrentIndex, drawBacksCurrentIndex, analysis, nutrientsText, benefitsText, drawBacksText]);

    
    return(
        <>
        <Navbar/>
        <div className="parent-container">
            <div className="app-container">
                <div className="app-body-container night-mode">
                <form
                 onSubmit={handleSubmit}
                 className="form-container">

                <input ref={fileRef} style={{display:'none'}} onChange={handleImageChange} type="file" accept="image/*" id="imageInput" />

                <div onClick={handleClickUpload} className="camera-icon">
                <p>upload or take a photo of your food</p>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l74-80h240v80H355l-73 80H120v480h640v-360h80v360q0 33-23.5 56.5T760-120H120Zm640-560v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Z"/></svg>
                </div>

                <div className="img-preview-container">
                    {imagePreview &&(
                        <img className="img-preview" src={imagePreview} alt="Image preview" />
                    )}   
                </div>
                {switchButton ? (
                    <button disabled={analyzing}  type="button" onClick={newPhoto}>{analyzing ? 'Analyzing...' : 'Analyze new food'}</button>
                ) : (
                    <button disabled={analyzing} className="analyze-bttn" type="submit">{analyzing ? 'Analyzing...' : 'Analyze my food'}</button> 
                )}
                
                
                {noFood && (
                    <h2 style={{color: 'rgb(255, 39, 39)'}}>No food detected!</h2>
                )}
                <h2>{welcomeMessage}</h2>
                </form>
                
                <div className="analysis">
                <div className="loading-container"> 
                    {analyzing &&(
                        <p>Analyzing...</p>
                    )}
                    <ClipLoader loading={analyzing} size={20} color="rgb(184 202 56)"/>
                </div>
                
                {errorMessage ? (
                    <h2 style={{color: 'rgb(255, 39, 39)'}}>{errorMessage}</h2>
                ) : ( analysis && (
                        <>

                        <div className="calorie-sugar-carbs">
                            <motion.h2 
                            className="kcal"
                            initial={{opacity: 0, scale: 0.8}}
                            whileInView={{opacity:1, scale: 1}}
                            transition={{duration: 0.5}}
                            viewport={{once:true}}
                            >
                                {analysis.calories} calories
                            </motion.h2>

                            <motion.h2 
                            className="food-name"
                            initial={{opacity: 0, scale: 0.8}}
                            whileInView={{opacity:1, scale: 1}}
                            transition={{duration: 0.8}}
                            viewport={{once:true}}
                            >
                                {analysis.food}
                            </motion.h2>

                            <motion.h3 
                            initial={{opacity: 0, scale: 0.8}}
                            whileInView={{opacity:1, scale: 1}}
                            transition={{duration: 1.2}}
                            viewport={{once:true}}
                            className="sugar"
                            >
                                Sugar: {analysis.sugar}g
                            </motion.h3>
                            <motion.h3 className="carbs"
                            initial={{opacity: 0, scale: 0.8}}
                            whileInView={{opacity:1, scale: 1}}
                            transition={{duration: 1.5}}
                            viewport={{once:true}}
                            >
                                Carbs: {analysis.carbs}g
                            </motion.h3>

                            {isVisible && (
                                <motion.div  
                                initial={{opacity: 1, scale:1}}
                                exit={{opacity:0 , scale: 0.8, transition: {duration: 0.5}}}
                                transition={{duration: 0.2}}
                                className="save-food-bttn-container"
                                >
                                    
                                    <h3>Save this in to your daily tracker?</h3>
                                    <div className="loading-container">
                                        {sumbiting && (
                                            <p>Saving..</p>   
                                        )}
                                        <ClipLoader loading={sumbiting} size={20} color="rgb(184 202 56)"/>
                                    </div>
    
                                        <div className="bttn-container"           
                                        >
                                        <motion.button                                   
                                        className="cancel-bttn "
                                        whileHover={{scale:1.06}}
                                        onClick={handleCancel}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -880 960 960" width="24px" fill="rgb(255, 248, 248)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                                        </motion.button>
                                        <motion.button 
                                        onClick={handleSave}
                                        className="save-bttn"
                                        whileHover={{scale:1.06}}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -870 960 960" width="24px" fill="rgb(255, 248, 248)"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                        </motion.button>
                                    </div> 
    
                                </motion.div>     
                            )}
                            

                        </div>
                        <div ref={contentRef} className="analysis-content">
                            
                            <motion.div 
                            initial={{opacity: 0, x: -200}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                            viewport={{once:true}}
                            className="analysis-column"
                            >
                                <h2>Nutrients <span><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsxlinkk="http://www.w3.org/1999/xlink" width='30px'height='30px' x="0px" y="0px" viewBox="0 -20 122.88 69.85"  xmlSpace="preserve"><g><path className="st0" d="M61.16,28.11c3.7-3.86,6.3-7.2,12.01-7.86c7.47-0.86,14.52,4.21,16.28,11.01c0.13-0.05,0.26-0.1,0.39-0.14 c1.39-0.47,2.82-0.7,4.29-0.68c1.2,0.01,2.42,0.19,3.66,0.53c1.08,0.3,2.17,0.72,3.28,1.26c-0.07-0.29-0.14-0.6-0.2-0.89 c-0.49-2.32-0.79-4.91-0.96-7.7c-0.16-2.67-0.21-5.51-0.19-8.45c-2.2,0.75-4.38,1.49-6.58,2.21c-0.82,0.37-1.57,0.54-2.27,0.55 c-0.71,0.01-1.36-0.16-1.94-0.49c-0.56-0.31-1.04-0.75-1.47-1.31c-0.42-0.55-0.77-1.2-1.08-1.95l-1.99-3.2 c-0.53-0.88-0.83-1.73-0.9-2.54c-0.07-0.83,0.1-1.62,0.5-2.36c0.37-0.69,0.95-1.32,1.74-1.9c0.77-0.57,1.74-1.08,2.91-1.54 c2.21-0.75,4.45-1.45,6.67-2.19c0.83-0.3,1.64-0.46,2.42-0.48c0.79-0.02,1.55,0.1,2.28,0.38c0.7,0.27,1.36,0.67,1.99,1.22 c0.61,0.53,1.17,1.2,1.7,2.01c2.79,1.78,5.2,4,7.27,6.59c2.08,2.61,3.81,5.6,5.23,8.94c1.42,3.32,2.53,6.97,3.38,10.92 c0.85,3.93,1.43,8.15,1.79,12.62c0.63,1.82,1.1,3.46,1.33,4.93c0.23,1.49,0.23,2.8-0.09,3.91c-0.35,1.22-1.04,2.19-2.13,2.87 c-1.06,0.67-2.51,1.07-4.42,1.18c-4.63,1.18-9.01,2.14-13.1,2.85c-4.1,0.72-7.91,1.2-11.43,1.41c-3.56,0.22-6.8,0.17-9.71-0.16 c-2.92-0.34-5.51-0.96-7.73-1.9c-0.15-0.06-0.28-0.16-0.38-0.27c-1.66,1.59-3.21,3.07-4.52,4.36l-8.05,7.99l-6.65-6.41 c-1.81-1.75-3.89-3.6-6.02-5.56c-2.16,0.87-4.66,1.46-7.46,1.78c-2.91,0.34-6.15,0.38-9.71,0.16c-3.51-0.22-7.33-0.7-11.43-1.41 c-4.09-0.72-8.47-1.67-13.1-2.85c-1.9-0.11-3.35-0.51-4.42-1.18c-1.09-0.69-1.77-1.65-2.13-2.87c-0.32-1.11-0.33-2.42-0.09-3.91 c0.23-1.47,0.69-3.11,1.33-4.93c0.36-4.46,0.95-8.69,1.79-12.62c0.85-3.95,1.96-7.6,3.38-10.92c1.42-3.33,3.16-6.33,5.23-8.94 c2.07-2.6,4.48-4.81,7.27-6.59c0.53-0.81,1.1-1.48,1.7-2.01c0.62-0.55,1.29-0.95,1.99-1.22c0.73-0.28,1.49-0.4,2.28-0.38 c0.78,0.02,1.59,0.18,2.42,0.48c2.22,0.74,4.46,1.44,6.67,2.19c1.17,0.46,2.14,0.97,2.91,1.54c0.78,0.58,1.36,1.21,1.74,1.9 c0.4,0.75,0.57,1.54,0.5,2.36c-0.07,0.81-0.37,1.66-0.9,2.54l-1.99,3.2c-0.31,0.75-0.66,1.41-1.08,1.95 c-0.43,0.56-0.91,1-1.47,1.31c-0.59,0.32-1.23,0.49-1.94,0.49c-0.7-0.01-1.45-0.18-2.27-0.55c-2.2-0.72-4.39-1.46-6.59-2.21 c0.02,2.94-0.02,5.78-0.19,8.45c-0.17,2.78-0.47,5.38-0.96,7.7c-0.06,0.29-0.13,0.6-0.2,0.89c1.11-0.55,2.2-0.97,3.28-1.26 c1.24-0.34,2.46-0.52,3.66-0.53c1.47-0.02,2.9,0.21,4.29,0.68l0.15,0.05c1.1-6.78,7.07-10.97,13.81-10.88 C53.84,20.39,56.71,23.79,61.16,28.11L61.16,28.11L61.16,28.11z M51.45,43.92c-0.52-0.49-0.78-1.15-0.8-1.82 c-0.01-0.66,0.23-1.33,0.72-1.85c0.49-0.51,1.15-0.78,1.82-0.79c0.66-0.01,1.33,0.23,1.85,0.72l3.94,3.77l8.86-10.24l0.32,0.24 l-0.32-0.24c0.02-0.03,0.06-0.06,0.09-0.08c0.53-0.45,1.19-0.66,1.84-0.63v0l0.03,0c0.65,0.04,1.29,0.33,1.76,0.86 c0.48,0.53,0.69,1.21,0.66,1.87h0l0,0.03c-0.04,0.64-0.32,1.26-0.83,1.73L60.75,49.42l0,0c-0.02,0.02-0.04,0.05-0.07,0.07 c-0.5,0.44-1.13,0.65-1.75,0.64c-0.63-0.01-1.26-0.25-1.75-0.72L51.45,43.92L51.45,43.92z M89.82,33.48 c0.19,2.35-0.24,4.84-1.49,7.32c-1.54,3.08-4.68,6.74-8.15,10.33c-1.6,1.65-3.27,3.29-4.88,4.85c1.98,0.78,4.28,1.31,6.86,1.6 c2.76,0.31,5.86,0.35,9.27,0.14c3.44-0.21,7.19-0.68,11.24-1.4c4.04-0.71,8.38-1.66,12.98-2.83c0.08-0.01,0.13-0.02,0.21-0.03 c1.46-0.07,2.54-0.34,3.32-0.77c0.75-0.42,1.2-1.01,1.42-1.76c0.25-0.86,0.23-1.93,0.02-3.2c-0.22-1.29-0.65-2.78-1.23-4.44 c-0.02-0.05-0.04-0.1-0.05-0.16l0-0.02c-0.01-0.05-0.02-0.1-0.02-0.15c-0.35-4.39-0.92-8.54-1.74-12.39 c-0.82-3.85-1.9-7.4-3.27-10.61c-1.36-3.18-3-6.02-4.97-8.49c-1.97-2.46-4.26-4.55-6.91-6.21c-0.07-0.04-0.14-0.09-0.19-0.15 c-0.06-0.06-0.11-0.12-0.15-0.19l-0.01-0.02c-0.42-0.67-0.86-1.21-1.33-1.64c-0.46-0.42-0.94-0.72-1.44-0.91 c-0.48-0.18-0.99-0.26-1.53-0.24c-0.55,0.02-1.12,0.14-1.72,0.36c-2.12,0.79-4.47,1.46-6.63,2.17c-0.94,0.37-1.71,0.77-2.3,1.18 c-0.58,0.41-0.99,0.84-1.23,1.28c-0.21,0.39-0.29,0.81-0.23,1.27c0.06,0.48,0.25,1,0.59,1.56c0.56,0.96,1.74,2.48,2.09,3.41 c0.22,0.56,0.47,1.05,0.75,1.44c0.27,0.38,0.56,0.66,0.89,0.84c0.29,0.16,0.62,0.24,1,0.22c0.39-0.02,0.84-0.13,1.35-0.36 l0.07-0.03l0.08-0.03l0.77-0.25c0.21-0.87,0.41-1.58,0.58-2.16l0.01-0.03c0.1-0.34,0.19-0.61,0.26-0.82 c-0.33,0.23-0.84,0.55-1.63,0.87l-0.43,0.17c-0.27,0.11-0.56,0.1-0.81-0.01c-0.25-0.11-0.46-0.31-0.56-0.58 c-0.11-0.27-0.1-0.56,0.01-0.81c0.11-0.25,0.31-0.46,0.58-0.56l0.43-0.17c2.56-1.03,3.66-1.47,4.37-0.42 c0.45,0.66,0.21,1.48-0.19,2.91c-0.08,0.27-0.15,0.54-0.23,0.81l4.88-1.66c0.05-0.01,0.09-0.02,0.14-0.03l0.01,0 c0.05-0.01,0.11-0.01,0.17-0.01c0.29,0,0.55,0.12,0.74,0.32c0.19,0.19,0.3,0.46,0.3,0.75c-0.04,3.21-0.02,6.32,0.14,9.23 c0.16,2.9,0.45,5.59,0.95,7.96c0.48,2.26,1.15,4.23,2.06,5.78c0.91,1.53,2.06,2.66,3.52,3.29l0.01,0.01 c0.26,0.12,0.45,0.32,0.55,0.57c0.1,0.24,0.11,0.52,0,0.78l-0.02,0.04c-0.12,0.26-0.32,0.45-0.57,0.54c-0.24,0.1-0.52,0.11-0.78,0 l-0.04-0.02c-1.37-0.59-2.51-1.49-3.46-2.66c-0.93-1.14-1.68-2.54-2.28-4.14c-1.37-0.84-2.7-1.48-4-1.9 c-1.32-0.43-2.59-0.66-3.82-0.67c-1.17-0.01-2.31,0.16-3.42,0.52L89.82,33.48L89.82,33.48z M46.76,56.28 c-6.73-6.33-13.43-13.71-13.74-22.27c-0.01-0.22-0.01-0.43-0.01-0.65c-0.27-0.11-0.55-0.21-0.83-0.3 c-1.11-0.36-2.26-0.53-3.42-0.52c-1.23,0.01-2.51,0.24-3.82,0.67c-1.3,0.43-2.63,1.06-4,1.9c-0.6,1.6-1.35,3-2.28,4.14 c-0.95,1.17-2.09,2.07-3.46,2.66l-0.04,0.02c-0.26,0.1-0.54,0.1-0.78,0c-0.24-0.1-0.45-0.29-0.57-0.54l-0.02-0.04 c-0.1-0.26-0.1-0.54,0-0.78c0.1-0.25,0.29-0.46,0.55-0.57l0.01-0.01c1.46-0.63,2.62-1.76,3.52-3.29c0.92-1.55,1.59-3.51,2.06-5.78 c0.5-2.37,0.8-5.06,0.95-7.96c0.16-2.91,0.18-6.02,0.14-9.23c0-0.29,0.11-0.55,0.3-0.75c0.19-0.19,0.45-0.31,0.74-0.32 c0.06,0,0.11,0,0.17,0.01l0.01,0c0.05,0.01,0.1,0.02,0.14,0.03l4.88,1.66c-0.08-0.27-0.15-0.55-0.23-0.81 c-0.41-1.43-0.64-2.25-0.19-2.91c0.71-1.05,1.81-0.61,4.37,0.42l0.43,0.17c0.27,0.11,0.47,0.32,0.58,0.56 c0.11,0.25,0.12,0.54,0.01,0.81c-0.11,0.27-0.32,0.47-0.56,0.58c-0.25,0.11-0.54,0.12-0.81,0.01l-0.43-0.17 c-0.79-0.32-1.3-0.64-1.63-0.87c0.07,0.21,0.16,0.48,0.26,0.82l0.01,0.03c0.17,0.58,0.37,1.29,0.58,2.16l0.77,0.25l0.08,0.03 l0.07,0.03c0.51,0.23,0.95,0.34,1.35,0.36c0.38,0.02,0.71-0.06,1-0.22c0.32-0.18,0.62-0.46,0.89-0.84 c0.28-0.39,0.53-0.87,0.75-1.44c0.35-0.93,1.53-2.45,2.09-3.41C37,9.38,37.2,8.86,37.25,8.38c0.05-0.46-0.02-0.89-0.23-1.27 c-0.24-0.45-0.65-0.88-1.23-1.28c-0.59-0.42-1.36-0.81-2.3-1.18c-2.17-0.71-4.51-1.39-6.63-2.17c-0.6-0.22-1.18-0.34-1.73-0.36 c-0.54-0.02-1.05,0.06-1.53,0.24c-0.5,0.19-0.98,0.49-1.44,0.91c-0.46,0.42-0.91,0.97-1.33,1.64l-0.01,0.02 c-0.04,0.07-0.1,0.13-0.15,0.19c-0.06,0.06-0.12,0.11-0.19,0.15c-2.65,1.66-4.94,3.75-6.91,6.21c-1.97,2.47-3.61,5.31-4.97,8.49 c-1.37,3.21-2.45,6.77-3.27,10.61c-0.82,3.85-1.39,8-1.74,12.39c0,0.05-0.01,0.1-0.02,0.15l0,0.02c-0.01,0.05-0.03,0.11-0.05,0.16 c-0.58,1.66-1.01,3.15-1.23,4.44c-0.22,1.27-0.23,2.34,0.02,3.2c0.21,0.75,0.67,1.34,1.42,1.76c0.77,0.44,1.86,0.7,3.32,0.77 c0.08,0.01,0.13,0.02,0.21,0.03c4.6,1.17,8.94,2.12,12.98,2.83c4.04,0.71,7.8,1.18,11.24,1.4c3.4,0.21,6.5,0.17,9.27-0.14 C42.95,57.33,44.97,56.9,46.76,56.28L46.76,56.28z M94.25,11.86c0.03,0,0.06,0.01,0.03-0.03C94.23,11.76,94.24,11.8,94.25,11.86 L94.25,11.86z M28.63,11.86c-0.03,0-0.06,0.01-0.03-0.03C28.65,11.76,28.64,11.8,28.63,11.86L28.63,11.86z"/></g></svg></span></h2>
                            {analysis.nutrients && analysis.nutrients.map((item, index) => (
                                <p key={`nutrient${index}`}>
                                {nutrientsCurrentIndex === index && nutrientsText ? nutrientsText : (nutrientsCurrentIndex > index ? item : '')}
                            </p>
                            ))}
                            </motion.div>

                            <motion.div 
                            initial={{opacity: 0, x: 200}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                            viewport={{once:true}}
                            className="analysis-column benefits"
                            >
                                <h2>Benefits <span><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width='20px' height='20px' viewBox="0 0 122.88 122.26"><title>health-care</title><path className="cls-1" d="M26.83,109V70.92H44c7.27,1.3,14.54,5.24,21.8,9.81H79.1c6,.36,9.19,6.48,3.32,10.49-4.66,3.43-10.82,3.23-17.14,2.66-4.36-.21-4.54,5.64,0,5.66,1.58.13,3.29-.25,4.79-.25,7.88,0,14.37-1.51,18.34-7.74l2-4.65,19.82-9.82c9.91-3.26,17,7.1,9.65,14.32a260.22,260.22,0,0,1-44.11,26c-10.94,6.65-21.87,6.42-32.79,0L26.83,109Zm41.1-97.8c5.24-5.45,8.9-10.17,17-11.1C100-1.6,114,13.9,106.33,29.16l-.14.27h-3V23.05a8.08,8.08,0,0,0-2.37-5.69l0,0A8,8,0,0,0,95.1,15H86.38a8.08,8.08,0,0,0-5.71,2.38h0a8.07,8.07,0,0,0-2.37,5.71v6.37H71.92a8.09,8.09,0,0,0-5.71,2.39h0a8.06,8.06,0,0,0-2.37,5.71v8.73a8.09,8.09,0,0,0,8.09,8.09h6.37v5.6L67.94,70.2l-9.4-9.05C47.23,50.26,28.79,36.56,28.18,19.57,27.76,7.68,37.14.06,47.94.19c9.65.13,13.71,4.93,20,11ZM0,67.25H21.67v45.61H0V67.25Z"/><path className="cls-2" d="M86.38,20.09H95.1a3,3,0,0,1,3,3v11.5h11.5a3,3,0,0,1,3,3v8.72a3,3,0,0,1-3,3H98.06V60.45a3,3,0,0,1-3,3H86.38a3,3,0,0,1-3-3V49.2H71.92a3,3,0,0,1-3-3V37.51a3,3,0,0,1,3-3h11.5V23.05a3,3,0,0,1,3-3Z"/></svg></span></h2>
                            {analysis.benefits && analysis.benefits.map((item, index) => (
                                <p key={`benefit${index}`}>
                                {benefitsCurrentIndex === index && benefitsText ? benefitsText : (benefitsCurrentIndex > index ? item : '')}
                            </p>
                            ))}
                            </motion.div >
                            
                            <motion.div 
                            initial={{opacity: 0, x: 200}}
                            whileInView={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                            viewport={{once:true}}
                            className="analysis-column drawbacks"
                            >
                                <h2>Drawbacks <span><svg width='20px' height='20px' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -10 122.88 105.01"><defs></defs><title>dislike</title><path className="cls-1" d="M4,61.65H32.37a4,4,0,0,0,4-4V4a4.05,4.05,0,0,0-4-4H4A4,4,0,0,0,0,4V57.62a4,4,0,0,0,4,4ZM62.16,98.71a7.35,7.35,0,0,0,4.07,5.65,8.14,8.14,0,0,0,5.56.32,15.53,15.53,0,0,0,5.3-2.71,26.23,26.23,0,0,0,9.72-18.86,57.44,57.44,0,0,0-.12-8.35c-.17-2-.42-4-.76-6.15h20.2a21.57,21.57,0,0,0,9.1-2.32,14.87,14.87,0,0,0,5.6-4.92,12.59,12.59,0,0,0,2-7.52,18.1,18.1,0,0,0-1.82-6.92,21.87,21.87,0,0,0,.54-8.39,9.68,9.68,0,0,0-2.78-5.67,25.28,25.28,0,0,0-1.4-9.44,19.9,19.9,0,0,0-4.5-7,28.09,28.09,0,0,0-.9-5A17.35,17.35,0,0,0,109.5,6h0C106.07,1.14,103.33,1.25,99,1.43c-.61,0-1.26.05-2.26.05H57.39a19.08,19.08,0,0,0-8.86,1.78,20.9,20.9,0,0,0-7,6.06L41,11V56.86l2,.54c5.08,1.37,9.07,5.7,12.16,10.89a76,76,0,0,1,7,16.64V98.2l.06.51Zm6.32.78a2.13,2.13,0,0,1-1-1.57V84.55l-.12-.77a82.5,82.5,0,0,0-7.61-18.24C56.4,59.92,52,55.1,46.37,52.87V11.94a14.87,14.87,0,0,1,4.56-3.88,14.14,14.14,0,0,1,6.46-1.21H96.73c.7,0,1.61,0,2.47-.07,2.57-.11,4.2-.17,5.94,2.28v0a12.12,12.12,0,0,1,1.71,3.74,24.63,24.63,0,0,1,.79,5l.83,1.76a15,15,0,0,1,3.9,5.75,21.23,21.23,0,0,1,1,8.68l-.1,1.59,1.36.84a4.09,4.09,0,0,1,1.64,3,17.44,17.44,0,0,1-.68,7.12l.21,1.94A13.16,13.16,0,0,1,117.51,54a7.34,7.34,0,0,1-1.17,4.39,9.61,9.61,0,0,1-3.59,3.12,16,16,0,0,1-6.71,1.7H79.51l.6,3.18a85.37,85.37,0,0,1,1.22,8.78,51.11,51.11,0,0,1,.13,7.56,20.78,20.78,0,0,1-7.62,14.95,10.29,10.29,0,0,1-3.41,1.78,3,3,0,0,1-2,0ZM22.64,19.71a5.13,5.13,0,1,0-5.13-5.13,5.13,5.13,0,0,0,5.13,5.13Z"/></svg></span></h2>
                            {analysis.drawbacks && analysis.drawbacks.map((item, index) => (
                                <p key={`drawback${index}`}>
                                {drawBacksCurrentIndex === index && drawBacksText ? drawBacksText : (drawBacksCurrentIndex > index ? item : '')}
                            </p>
                            ))}
                            </motion.div>
                            
                        </div> 
                        </>             
                    )
                )}
                
                </div>    
                </div>
                <Footer/>   
            </div>
        </div>
        </>
        
    )
}

export default FeedPage;