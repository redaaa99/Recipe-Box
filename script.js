

var App = React.createClass({

    getInitialState : function () {
        return {
            content: [
                {
                    name : "Roasted Balsamic Chicken",
                    ing : ["Large skinless, boneless chicken breast halves","tablespoon olive oil","cup balsamic vinegar","Clove garlic"]
                },
                {
                    name : "Apricot-Mustard Chicken Sandwiches",
                    ing : ["cup finely chopped onion","Shredded Chicken Master Recipe","spicy brown mustard"," 1/4 teaspoon cayenne pepper"]
                },
                {
                    name : "No-added sugar blueberry doughnuts",
                    ing : ["50g plain flour","100ml milk","1 large egg","1tsp Nielsen-Massey Vanilla Extract","115g blueberries"]
                },
            ]
        }

    },

    render() {
        return (
            <div className="container-fluid">
                <br/>
                {this.state.content.map(function(item,index){
                    return (<Recipe key={index} ing={item.ing} >{item.name}</Recipe>)
                })}
                <button id="boutton" className="btn"><span className="glyphicon glyphicon-plus-sign"></span> Add a recipe </button>
            </div>
        );
    }
});


var Recipe = React.createClass({

    getInitialState : function () {
        return {
            details : false
        }
    },
    showDetails : function(){
        if(this.state.details===true)
        {
            this.setState({details:false});
        }else{
            this.setState({details:true});
        }
    },
    renderDetails : function (){
        return (
            <div id="test">
                <div id="hoverMePlease" className="well" onClick={this.showDetails}>{this.props.children}</div>
                    <div id="jquerySlide" className="well-sm" >
                        <ul>
                            {this.props.ing.map(function(item,index){
                                return (<li key={index}>{item}</li>)
                            })}
                        </ul>
                    </div>

            </div>

        );
    },
    renderNormal : function () {
        return (
            <div id="test">
                <div id="hoverMePlease" className="well" onClick={this.showDetails} >{this.props.children}</div>
            </div>
        );
    },
    render() {
        if(this.state.details===true)
        {
            return this.renderDetails();
        }else{
            return this.renderNormal();
        }
    }
});

ReactDOM.render(<App/>, document.getElementById("container"));
