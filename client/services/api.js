const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const uploadFood = async (postData) => {
  try {
    const response = await fetch(`${BASE_URL || 'http://localhost:3001'}/analyze`, {
      method: 'POST',
      body: postData
    });

    if (!response.ok) {
      const errorText = await response.text(); 
      throw new Error(`Server error: ${errorText}`);
    }

    const data = await response.json();
    // console.log(data.analysis);
    return data;
  } catch (error) {
    console.error("Upload failed:", error.message);
    throw error; 
  }
};
export const saveData = async(data) =>{
  console.log(data);
  const headers = {
    'Content-Type': 'application.json',
  }

  try {
    const response = await fetch(`${BASE_URL || 'http://localhost:3001'}/save`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })

    if(!response.ok){
      const error = await response.json();
      throw new Error(error.message || 'failed to save data!');
    }
  } catch (error) {
    console.error("saving failed:", error.message);
    throw error; 
  }
}
