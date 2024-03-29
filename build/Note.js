var Note = React.createClass({displayName: "Note",
    getInitialState: function() {
        return {editing: false};
    },
    edit: function() {
        this.setState({editing: true});
    },
    componentDidMount: function(){
        $(this.getDOMNode()).draggable()
    },
    componentWillMount: function(){
        this.style={
            right: this.randomBetween(0, window.innerWidth-150)+'px',
            top: this.randomBetween(0, window.innerHeight-150)+'px',
            transform: "rotate("+ this.randomBetween(-15, 15)+'deg)'
        };
    },
    randomBetween: function(min, max){
        return (min+Math.ceil(Math.random()*max));
    },
    save: function() {
        this.props.onChange(this.refs.Newtext.getDOMNode().value, this.props.index);
        this.setState({editing: false});
    },
    remove: function() {
        this.props.onRemove(this.props.index);
    },
    renderDisplay: function() {
        return (
            React.createElement("div", {className: "note", style: this.style}, 
                React.createElement("p", null, this.props.children), 
                React.createElement("span", null, 
                    React.createElement("button", {onClick: this.edit, 
                            className: "btn btn-primary glyphicon glyphicon-pencil"}), 
                    React.createElement("button", {onClick: this.remove, 
                            className: "btn btn-danger glyphicon glyphicon-trash"})
                )
            )
            );
    },
    renderForm: function() {
        return (
            React.createElement("div", {className: "note", style: this.style}, 
            React.createElement("textarea", {ref: "Newtext", defaultValue: this.props.children, 
            className: "form-control"}), 
            React.createElement("button", {onClick: this.save, className: "btn btn-success btn-sm glyphicon glyphicon-floppy-disk"})
            )
            )
    },
    render: function() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});

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

React.render(React.createElement(Board, {count: 5}), 
    document.getElementById('react-container'));