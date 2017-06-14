## MongoDB 数组操作
`$push`：向文档数组中添加元素，如果没有该数组，则自动添加数组。

    db.posts.insert({title:'Snape'})
    db.posts.update({title:'Snape'}, {$push: {comments: '回复1'}})
    db.posts.update({title:'Snape'}, {$push: {comments: '回复2'}})

以上代码，先创建`title`为`Snape`的帖子，然后在增加两条回复在comments数组中。

`$addToSet`：功能与`$push`相同，区别在于，`$addToSet`把数组看作成一个`Set`，如果数组中存在相同的元素，不会插入。
`$addToSet`还可以与`$each`组合使用，一次添加多个值。

    db.posts.update({title:'Snape'}, {$addToSet:{comments: {$each:['回复3', '回复4']}}})

`$pop`与`$push`相对应，删除数组里的元素

    db.posts.update({title:'Snape'}, {$pop: {comments: {key: 1}}})

`key=1`，从尾删除，`key=-1`，从头删除

`$pull`删除指定元素，结合上面的例子，就是删除指定的回复
    
    db.posts.update({title:'Snape'}, {$pull:{comments: '回复3'}})

修改指定位置的元素，数组元素索引是从0开始，假如要把第一个回复修改了：

    db.posts.update({title:'Snape'}, {$set:{'comments.0': '修改回复1'}})

在不知道索引的时候想要修改回复：

    db.posts.update({title:'Snape', comments: '回复2'}, {$set:{'comments.$': '修改回复2'}})
