"use client";
import { authClient } from '@/lib/auth-client';
import { FieldError, Input, Label, TextField,Select, ListBox, TextArea, Button, Card } from '@heroui/react';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

const AddIdeasPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const onSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());
    const myIdeas = {
        ...formEntries,
        authorName: user?.displayName,
        authorEmail: user?.email, 
        status: "Active",                     
        postedDate: new Date().toLocaleDateString() 
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(myIdeas)
    });
    const data = await res.json();
    console.log(data)
    if(res.ok){
      toast.success('Idea added');
      redirect('/ideas');
    }else{
      toast.error("failed to add");
    }
  }
    return (
        <div className='max-w-7xl mx-auto mt-5 md:mt-10'>
        <Card>
             <form onSubmit={onSubmit} className="p-10 space-y-8">
             <div className="text-center md:text-left mb-6">
               <h2 className="text-2xl font-bold">Submit Your Startup Idea</h2>
               <p className="text-gray-500 text-sm mt-1">Share your innovative business concept with the world.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* 1. Idea Title */}
               <div className="md:col-span-2">
                 <TextField name="ideaTitle" isRequired>
                   <Label>Idea Title</Label>
                   <Input placeholder="e.g., MediChain - Smart Health Records" className="rounded-2xl" />
                   <FieldError />
                 </TextField>
               </div>

               {/* 2. Category Dropdown */}
               <div className="md:col-span-2">
                 <Select
                   name="category"
                   isRequired
                   className="w-full"
                   placeholder="Select category"
                 >
                   <Label>Category</Label>
                   <Select.Trigger className="rounded-2xl">
                     <Select.Value />
                     <Select.Indicator />
                   </Select.Trigger>
                   <Select.Popover>
                     <ListBox>
                       <ListBox.Item id="Tech" textValue="Tech">Tech</ListBox.Item>
                       <ListBox.Item id="AI" textValue="AI">Artificial Intelligence (AI)</ListBox.Item>
                       <ListBox.Item id="Health" textValue="Health">Health & Medical</ListBox.Item>
                       <ListBox.Item id="Education" textValue="Education">EdTech / Education</ListBox.Item>
                       <ListBox.Item id="Fintech" textValue="Fintech">Fintech / Finance</ListBox.Item>
                       <ListBox.Item id="E-commerce" textValue="E-commerce">E-commerce</ListBox.Item>
                       <ListBox.Item id="Sustainability" textValue="Sustainability">Sustainability / Green Tech</ListBox.Item>
                     </ListBox>
                   </Select.Popover>
                 </Select>
               </div>

               {/* 3. Target Audience */}
               <div className="md:col-span-2">
                 <TextField name="targetAudience" isRequired>
                   <Label>Target Audience</Label>
                   <Input placeholder="e.g., Small business owners, University students, Remote workers" className="rounded-2xl" />
                   <FieldError />
                 </TextField>
               </div>

               {/* 4. Image URL */}
               <div className="md:col-span-2">
                 <TextField name="imageUrl" isRequired>
                   <Label>Concept Image URL</Label>
                   <Input
                     type="url"
                     placeholder="https://example.com/your-idea-banner.jpg"
                     className="rounded-2xl"
                   />
                   <FieldError />
                 </TextField>
               </div>

               {/* 5. Short Description */}
               <div className="md:col-span-2">
                 <TextField name="shortDescription" isRequired>
                   <Label>Short Description</Label>
                   <TextArea
                     placeholder="Summarize your idea in one or two punchy sentences..."
                     className="rounded-3xl"
                   />
                   <FieldError />
                 </TextField>
               </div>

               {/* 6. Problem Statement */}
               <div className="md:col-span-2">
                 <TextField name="problemStatement" isRequired>
                   <Label>Problem Statement</Label>
                   <TextArea
                     placeholder="What specific problem does your target audience face?"
                     className="rounded-3xl"
                   />
                   <FieldError />
                 </TextField>
               </div>

               {/* 7. Proposed Solution */}
               <div className="md:col-span-2">
                 <TextField name="proposedSolution" isRequired>
                   <Label>Proposed Solution</Label>
                   <TextArea
                     placeholder="How does your startup idea solve this problem uniquely?"
                     className="rounded-3xl"
                   />
                   <FieldError />
                 </TextField>
               </div>

               {/* 8. Detailed Description */}
               <div className="md:col-span-2">
                 <TextField name="detailedDescription" isRequired>
                   <Label>Detailed Description</Label>
                   <TextArea
                     placeholder="Provide a deep dive into features, monetization strategy, or future plans..."
                     className="rounded-3xl"
                     rows={6}
                   />
                   <FieldError />
                 </TextField>
               </div>
             </div>

             {/* Submit Button */}
             <Button
               type="submit"
               variant="solid"
               className="rounded-xl w-full bg-blue-500 text-white font-medium py-6 text-lg transition-transform hover:scale-[1.01]"
             >
             Submitting Your Idea
             </Button>
         </form>
        </Card>
        </div>
    );
};

export default AddIdeasPage;