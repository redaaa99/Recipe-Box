
    var LeaderBoard = React.createClass({

        getInitialState:function(){
            return{
                data: []
            };
        },
        componentDidMount(){
            var that = this;
            $.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', function(response) {
                that.setState({data: response});
            });
        },
        handleClickLast : function(){
            var that = this;
            $.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/recent', function(response) {
                that.setState({data: response});
            });
        },

        handleClickAll : function(){
            var that = this;
            $.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', function(response) {
                that.setState({data: response});
            });
        },
        render: function(){

            return (
					<div id="lessPlease" className="container-fluid">
						<h1 id="centerMe">LeaderBoard</h1>
						<table className="table table-inverse table-bordered">
							<thead>
							<tr>
								<th>Rank</th>
								<th>Camper Name</th>
								<th id="hoverMe" onClick={this.handleClickLast}>Points In Last 30 Days</th>
								<th id="hoverMe" onClick={this.handleClickAll}>Points All Time</th>
							</tr>
							</thead>
							<Rows result={this.state.data}/>
						</table>
					</div>
            )
        }
    })

    var Rows = React.createClass({
        render: function(){

            if(this.props.result.length==100)
            {
                return (
						<tbody>
                        {this.props.result.map((item, index) => (
								<tr id={"lign-"+index.toString()+""} key={index}>
									<th id="alignVertic" >#&nbsp;{(index+1).toString()}</th>
									<th id="leftplease"><img id="profilePic" src={item.img} />&nbsp;&nbsp;{item.username}</th>
									<th id="alignVertic" >{item.recent}</th>
									<th id="alignVertic" >{item.alltime}</th>
								</tr>
                        ))}
						</tbody>
                )
            }
            return null;

        }
    })
    ReactDOM.render(
			<LeaderBoard />,
        document.getElementById('container')
    )
