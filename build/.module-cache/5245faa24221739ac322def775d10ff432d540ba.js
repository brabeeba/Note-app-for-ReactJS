
var Board= React.createClass({displayName: "Board",
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
    nextID: function(){
        this.uniqueId=this.uniqueId || 0;
        return this.uniqueId++;
    },
    getInitialState: function(){
        return {
            note: [
            ]
        };

    },
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
    update: function(Newtext, i){
        var arr= this.state.note;
        arr[i].note=Newtext;
        this.setState({note:arr});
    },

    remove: function(i){
        var arr = this.state.note;
        arr.splice(i,1);
        this.setState({note:arr});
    },

    eachNote: function(note, i){
        return (React.createElement(Note, {key: note.id, 
                index: i, 
                onChange: this.update, 
                onRemove: this.remove}, note.note));

    },
    add: function(text){
        var arr=this.state.note;
   
        arr.push({
            id: this.nextID(),
            note: text
        });
        
        this.setState({note:arr});

    },

    render: function() {
        return (React.createElement("div", {className: "board"}, this.state.note.map(this.eachNote), 
                React.createElement("button", {className: "btn btn-sm btn-success glyphicon glyphicon-plus", onClick: this.add.bind(null,"New Note")})
            ));
    }
});