const Blog=require('../models/blog')


const blog_index= (req,res)=>{
    Blog.find().sort({createdAt:-1})        //createdAt is a timestamp which refers to when a document was created.....and -1 means sort in descending order
        .then((result)=>{
            res.render('blogs/index',{title:'All blogs', blogs:result});
        })
        .catch((err)=>{
            console.log(err);
        })
}

const blog_details=(req,res)=>{
    const id=req.params.id;
    Blog.findById(id)
        .then(result=>{
            res.render('blogs/details',{blog:result,title:'Blog details'});
        })
        .catch((err)=>{
            res.status(404).render('404',{title:'Blog not found'})
            console.log(err)
        });
}

const blog_create_get= (req,res)=>{
    res.render('blogs/create',{title:'create'});
}

const blog_create_post= (req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
        .then((result)=>{
            res.redirect('/blogs')
        })
        .catch((err)=>console.log(err));
}

blog_delete = (req,res)=>{
    const id=req.params.id;
    console.log(id);
    

    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({ redirect:'/blogs' })
        })
        .catch((err)=>console.log(err));
}

module.exports={ 
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}

