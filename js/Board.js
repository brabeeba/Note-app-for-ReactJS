
var Board= React.createClass({
    //use propTypes to check condition
    propTypes: {
        count: function(props, propName){
            if (typeof props[propName] != "number"){
                return new Error("The count must be a number");
            }

            if (props[propName]>100) {
                alert("fuck");
                return new Error("Creating "+props[propName]+" is ridiculous.");
            }
        }

    },
    //generate unique key  
    nextID: function(){
        this.uniqueId=this.uniqueId || 0;
        return this.uniqueId++;
    },
    //initialize with an empty note array
    getInitialState: function(){
        return {
            note: [
            ]
        };

    },
    //get data from baconipsum api
    componentWillMount: function(){
        var self=this;
        if (this.props.count){
            $.getJSON("http://baconipsum.com/api/?type=all-meat&sentences="+
                this.props.count + "&start-with-lorem=1&callback=?", function(result){
                    result[0].split('. ').forEach(function(sentence){
                        self.add(sentence.substring(0,40));
                    });
                });
        }
    },
    //update the note
    update: function(Newtext, i){
        var arr= this.state.note;
        arr[i].note=Newtext;
        this.setState({note:arr});
    },
    //remove the note
    remove: function(i){
        var arr = this.state.note;
        arr.splice(i,1);
        this.setState({note:arr});
    },
    //render each note
    eachNote: function(note, i){
        return (<Note key={note.id} 
                index={i}
                onChange={this.update}
                onRemove={this.remove}>{note.note}</Note>);

    },
    //add the note
    add: function(text){
        var arr=this.state.note;
   
        arr.push({
            id: this.nextID(),
            note: text
        });
        
        this.setState({note:arr});

    },
    //render each note
    render: function() {
        return (<div className="board">{this.state.note.map(this.eachNote)}
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus" onClick={this.add.bind(null,"New Note")}/>
            </div>);
    }
});
