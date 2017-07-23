

var App = React.createClass({

    getInitialState : function () {
        return {
            content: [
                {
                    name : "Roasted Balsamic Chicken",
                    ing : ["Large skinless, Boneless chicken breast halves","Tablespoon olive oil","Cup balsamic vinegar","Clove garlic"]
                },
                {
                    name : "Apricot-Mustard Chicken Sandwiches",
                    ing : ["Cup finely chopped onion","Shredded Chicken Master Recipe","Spicy brown mustard"," 1/4 teaspoon cayenne pepper"]
                },
                {
                    name : "No-added sugar blueberry doughnuts",
                    ing : ["50g plain flour","100ml milk","1 large egg","1tsp Nielsen-Massey Vanilla Extract","115g blueberries"]
                },

            ],
            showingAddRecipe : false,
            editingId : -1
        }

    },
    showAddForm : function () {

        this.setState({showingAddRecipe:!this.state.showingAddRecipe});
    },
    savePlease : function (freshRecipe,editid) {
        if(editid>=0)
        {
            if(freshRecipe[0]!=="") {
                if (freshRecipe[1]!== "") {
                    var ingredientsTab = freshRecipe[1].split(",");
                    var recipeObject = {
                        name: freshRecipe[0],
                        ing: ingredientsTab
                    };
                    var appArray = this.state.content;
                    appArray[editid]=recipeObject;
                    this.setState({content: appArray, showingAddRecipe: false, editingId : -1});
                }
            }
            this.setState({showingAddRecipe: false,editingId : -1});
        }
        else
        {
            if(freshRecipe[0]!=="") {
                if (freshRecipe[1]!== "") {
                    var ingredientsTab = freshRecipe[1].split(",");
                    var recipeObject = {
                        name: freshRecipe[0],
                        ing: ingredientsTab
                    };
                    var appArray = this.state.content;
                    appArray.push(recipeObject);
                    this.setState({content: appArray, showingAddRecipe: false});
                }
            }
        }

    },
    editPlease : function (id) {
        this.setState({showingAddRecipe : true,editingId: id});
    },
    removePlease : function (id) {


        var array = this.state.content;
        array.splice(id, 1);
        this.setState({content:array})
    },
    render : function (){
        if(this.state.showingAddRecipe)
        {
            if(this.state.editingId>=0)
            {
                return (

                    <AddRecipeForm onSaveClick={this.savePlease} idOfRecipeToDisplay={this.state.editingId} recipeToDisplay={this.state.content[this.state.editingId]} />

                );
            }else{
                return (
                    <AddRecipeForm onSaveClick={this.savePlease} />
                );
            }

        }
        else
        {
            var thaat =this;
            return (
                <div id="app" className="container-fluid">
                    <br/>
                    {this.state.content.map(function(item,index){
                        return (<Recipe handleRemoveClick={thaat.removePlease} handleEditClick={thaat.editPlease} key={index} ing={item.ing} id={index+1} >{item.name}</Recipe>)
                    })}
                    <button id="boutton" className="btn" onClick={this.showAddForm} ><span className="glyphicon glyphicon-plus-sign"></span> Add a recipe </button>
                </div>
            );
        }

    }
});


var AddRecipeForm= React.createClass({
    addNewRecipe : function () {
        var name = this.refs.recipeName.value.toString().trim();
        var ingreds = this.refs.recipeIng.value.toString().trim();

        var recipe =[];
        recipe.push(name);
        recipe.push(ingreds);
        this.props.onSaveClick(recipe,this.props.idOfRecipeToDisplay);

    },
    render : function() {
        var object= this.props.recipeToDisplay;

        var style = {
            backgroundColor : "white",
            height: "260px",
            boxShadow : "2px 10px 30px black",
            borderRadius : "20px",
            border :"2px orange solid"
        };
        var styleForm= {
            marginLeft: "18px",
            marginRight: "18px",
            paddingTop: "18px",
            textAlign: "center"
        };
        var styleButton={
            margin: "10px auto",
            textAlign : "center",
            width : "60px"
        };
        if(this.props.idOfRecipeToDisplay>=0)
        {
            return (
                <div className="the-thing" style={style}>
                    <div style={styleForm}>
                        <div className="form-group">
                            <label>Recipe Name :</label>
                            <input ref="recipeName" type="text" className="form-control" id="name" defaultValue={object.name} />
                        </div>
                        <div class="form-group">
                            <label>Add Ingredients separated by ',' :</label>
                            <textarea ref="recipeIng" className="form-control" id="addedRecipes" defaultValue={object.ing.join(",")}></textarea>
                        </div>
                        <button style={styleButton} className="btn btn-success" onClick={this.addNewRecipe}>Save</button>
                    </div>
                </div>
            );
        }
        else
        {
            return (
                <div className="the-thing" style={style}>
                    <div style={styleForm}>
                        <div className="form-group">
                            <label>Recipe Name :</label>
                            <input ref="recipeName" type="text" className="form-control" id="name" />
                        </div>
                        <div class="form-group">
                            <label>Add Ingredients separated by ',' :</label>
                            <textarea ref="recipeIng" className="form-control" id="addedRecipes"></textarea>
                        </div>
                        <button style={styleButton} className="btn btn-success" onClick={this.addNewRecipe}>Save</button>
                    </div>
                </div>
            );
        }

    }
});

var Recipe = React.createClass({

    getInitialState : function () {
        return {
            details : false
        }
    },
    remove : function () {
      this.props.handleRemoveClick((this.props.id)-1);
    },
    edit : function () {
      this.props.handleEditClick((this.props.id)-1);
    },
    showDetails : function(){
        this.setState({details:!this.state.details});
    },
    renderDetails : function (){
        var that = this.props.id;
        return (
            <div id={this.props.id} className="recipe">
                <div className="well" ><p id="hoverMePlease"  onClick={this.showDetails} >{this.props.children}<span></span>&nbsp;&nbsp;&nbsp;<span className="glyphicon glyphicon-chevron-down"></span></p>
                    <div id="helper" className="well" >
                        <h4 id="ingredientsTitle">{this.props.children.toString()+":"}</h4>
                        <ul id="ul">
                            {this.props.ing.map(function(item,index){
                                return (<li id="li" key={index}>{item}</li>)
                            })}
                        </ul>
                    </div>
                    <button id="pushLeft" onClick={this.edit} className="btn btn-success"><span className="glyphicon glyphicon-cutlery"></span> Edit </button>
                    <button className="btn btn-danger" onClick={this.remove}><span className="glyphicon glyphicon-remove"></span> Remove </button>
                </div>
            </div>

        );
    },
    renderNormal : function () {
        return (
            <div id={this.props.id} className="recipe">
                <div className="well"><p id="hoverMePlease"  onClick={this.showDetails} >{this.props.children}<span></span>&nbsp;&nbsp;&nbsp;<span className="glyphicon glyphicon-chevron-up"></span></p></div>
            </div>
        );
    },
    render() {
        if(this.state.details)
        {
            return this.renderDetails();
        }else{
            return this.renderNormal();
        }
    }
});

ReactDOM.render(<App/>, document.getElementById("container"));
