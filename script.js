var Record = React.createClass({
    render: function(){
        return (
            <tr>    
                <td>{this.props.rank}</td>
                <td>{this.props.camperName}</td>
                <td>{this.props.ptsLast30}</td>
                <td>{this.props.ptsOverall}</td>

            </tr>
        )
    }
})

var Board = React.createClass({

    getInitialState: function(){
        return {
            order: "recent",
            recent: [],
            alltime: []
        }
    },

    componentDidMount: function() {
        if(this.isMounted()){
            var self = this;
            $.getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/recent?callback=", function(result){
                //load data for recent
                self.setState({recent: result})

            }) 

            $.getJSON("https://fcctop100.herokuapp.com/api/fccusers/top/alltime?callback=", function(result){
                //load data for alltime
                self.setState({alltime: result})
            }) 
        }

    },

    downArrow: function(order) {
        //returns a span with an arrow this is displayed if this.state.order == order
    
        return (
            <span className={"glyphicon glyphicon-chevron-down"+(this.state.order==order ? "" : "hidden")}></span>
        )
    },

    sortbyRecent: function(){
        //changes state of the order we are sorting by

        this.setState({order: "recent"})
    },

    sortbyAlltime: function(){
        //changes state of the order we are sorting by

        this.setState({order: "alltime"})
    },

    eachRecord: function(record, i){
        //render reach record
        return (
            <tr key={i}>
                <td className="text-center vcenter">{i+1}</td>
                <td>
                    <img className="user-img img-rounded" src={record.img} alt=""/>
                    <a className="username" href={"http://www.freecodecamp.com/".concat(record.username)}>{record.username}</a>
                </td>
                <td className="text-center vcenter">{record.recent}</td>
                <td className="text-center vcenter">{record.alltime}</td>

            </tr>
        )
    },

    render: function(){
        console.log(this.state)
        if(this.state.order == "recent"){
            //render recent
            var records = this.state.recent;
        } else if(this.state.order == "alltime") {
            //render alltime
            var records = this.state.alltime;
        }

        return (
            <table className="table 
            table-stripped 
            table-bordered 
            table-responsive">
                <tr>
                    <th> Rank </th>
                    <th> Camper Name </th>
                    <th className="score-col"
                        onClick={this.sortbyRecent}>
                        Brownie Points: last 30 days {this.downArrow("recent")}
                    </th>
                    <th className="score-col"
                        onClick={this.sortbyAlltime}>
                        Brownie Points: all time {this.downArrow("alltime")}
                    </th> 
                </tr>
                <tbody>
                    {records.map(this.eachRecord)}
                </tbody>
            </table>
        )

    }
})


React.render(<Board/>, 
    document.getElementById('container'));


// .glyphicon-chevron-down