import React, { useEffect, useState } from 'react';

interface FeedsProps {
  email: string;
}

const Feeds:React.FC<FeedsProps> = ({email}) => {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [isExpanded,setIsExpanded]=useState<boolean>(false)

  const toggleExpand =()=>{
    setIsExpanded((prev)=>!prev)
  }

  // Fetch data from Supabase
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://awxpaiztcbfjwzyvfyup.supabase.co/rest/v1/news_content',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eHBhaXp0Y2Jmand6eXZmeXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxOTUyNDYsImV4cCI6MjA0OTc3MTI0Nn0.WQvPpbs_jWa36jYVJPYu_PnLgqdXyxooXQawK2MsQRc`, // Replace with your actual anon key
            'apiKey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eHBhaXp0Y2Jmand6eXZmeXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxOTUyNDYsImV4cCI6MjA0OTc3MTI0Nn0.WQvPpbs_jWa36jYVJPYu_PnLgqdXyxooXQawK2MsQRc', // Replace with your actual API key
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setContent(data);  // Store data in state
        setLoading(false);  // Set loading to false when data is fetched
      } else {
        console.error('Failed to fetch data:', response.status);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  // Use useEffect to call fetchData once the component renders
  useEffect(() => {
    fetchData();
  }, []);

  // This is for loading spinner effect
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }


  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (

<div className="feeds-container p-6">
  <h3 className="text-blue-800 text-end">Welcome, {email.split('@')[0]}</h3>
  <h2 className="text-2xl text-center text-red-600 font-bold mb-4">Feeds</h2>
  
  <div className="content-list space-y-4">
    {content.length > 0 ? (
      content.map((item) => (
        <div
          key={item.id}
          className="feed-item bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col sm:flex-row sm:space-x-4"
        >
          <img
            src={item.image_url}
            alt={item.title}
            className="feed-image w-[250px] h-auto rounded-lg mb-4 sm:mb-0 sm:w-[200px] sm:h-[150px] object-cover"
          />
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg">
              {item.title}
              <span className="text-sm text-blue-700 ml-2 cursor-pointer">Follow</span>
          <button className='text-sm ml-4 text-red-700'>Tag +</button>
              
            </h3>
            <span className="block text-sm text-gray-500">
              {/* formatted date */}
              {new Date(item.created_at).toLocaleString('en-GB', { 
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
            <p className="mt-2">
              {/* added read more and read less option to avoid more content to display initally */}
              {isExpanded ? item.description : `${item.description.substring(0, 390)}...`} 
              {item.description.length > 100 && (
                <button onClick={toggleExpand} className="text-blue-500 ml-2">
                  {isExpanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p>No Feeds available</p> // displays when there is no data
    )}
  </div>
</div>


  
  );
};

export default Feeds;
