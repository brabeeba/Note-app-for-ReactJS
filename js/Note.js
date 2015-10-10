//The note react component
var Note = React.createClass({
    //initialize with editing flase
    getInitialState: function() {
        return {editing: false};
    },
    //set edit as true
    edit: function() {
        this.setState({editing: true});
    },
    //use jQuery to make component draggable
    componentDidMount: function(){
        $(this.getDOMNode()).draggable()
    },
    //apply the random css property
    componentWillMount: function(){
        this.style={
            right: this.randomBetween(0, window.innerWidth-150)+'px',
            top: this.randomBetween(0, window.innerHeight-150)+'px',
            transform: "rotate("+ this.randomBetween(-15, 15)+'deg)'
        };
    },
    //define randome function
    randomBetween: function(min, max){
        return (min+Math.ceil(Math.random()*max));
    },
    //save function
    save: function() {
        this.props.onChange(this.refs.Newtext.getDOMNode().value, this.props.index);
        this.setState({editing: false});
    },
    //remove function
    remove: function() {
        this.props.onRemove(this.props.index);
    },
    //render display when it is not editing
    renderDisplay: function() {
        return (
            <div className="note" style={this.style}>
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit}
                            className="btn btn-primary glyphicon glyphicon-pencil"/>
                    <button onClick={this.remove}
                            className="btn btn-danger glyphicon glyphicon-trash"/>
                </span>
            </div>
            );
    },
    //render display when it is editing
    renderForm: function() {
        return (
            <div className="note" style={this.style}>
            <textarea ref="Newtext" defaultValue={this.props.children} 
            className="form-control"></textarea>
            <button onClick={this.save} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk" />
            </div>
            )
    },
    //render
    render: function() {
        if (this.state.editing) {
            return this.renderForm();
        }
        else {
            return this.renderDisplay();
        }
    }
});
