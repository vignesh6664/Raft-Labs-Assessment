import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_CONTENT } from "../../graphql/mutations/addContent";

const apiKey=import.meta.env.VITE_API_KEY
const endPointUrl = import.meta.env.VITE_END_POINT_URL

const CreateFeeds = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
  
    // GraphQL mutation hook
    const [addContent, { data, loading, error }] = useMutation(ADD_CONTENT);// mutation to create news

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch(
      'https://awxpaiztcbfjwzyvfyup.supabase.co/rest/v1/news_content',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
              apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eHBhaXp0Y2Jmand6eXZmeXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxOTUyNDYsImV4cCI6MjA0OTc3MTI0Nn0.WQvPpbs_jWa36jYVJPYu_PnLgqdXyxooXQawK2MsQRc',   
Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3eHBhaXp0Y2Jmand6eXZmeXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxOTUyNDYsImV4cCI6MjA0OTc3MTI0Nn0.WQvPpbs_jWa36jYVJPYu_PnLgqdXyxooXQawK2MsQRc`,
},
        body: JSON.stringify({
          title,
          description,
          image_url: imageUrl,
        }),
      }
    );

    if (response.ok) {
      const contentType = response.headers.get('Content-Type');
      let data = null;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json(); // Parse JSON only if Content-Type is JSON
      }

     alert("Post Created Sucessfully")
      console.log('Content inserted:', data);
      // Reset form fields
      setTitle('');
      setDescription('');
      setImageUrl('');
    } else {
      const errorText = await response.text(); // Fallback to text error message
      console.error('Failed to insert content:', errorText);
      alert('Error: ' + errorText);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    alert('An unexpected error occurred.');
  }
};

  return (
    <div className="p-4">
      <h2 className="text-2xl text-center text-red-600 font-bold mb-4">Post Your Feed</h2>
      {error && <p className="text-red-500">{error.message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mt-3 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-3 p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full mt-3 p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

    </div>
  )
}

export default CreateFeeds