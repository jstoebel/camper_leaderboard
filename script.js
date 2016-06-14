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

    eachRecord: function(record, i){
        //render reach record
        return (
            <tr key={i}>
                <td>{i+1}</td>
                <td><img src={record.img} alt=""/></td>
                <td>{record.username}</td>
                <td>{record.recent}</td>
                <td>{record.alltime}</td>

            </tr>
        )
    },

    renderAlltime: function(){
        return(
            <table className="table 
            table-stripped 
            table-bordered 
            table-responsive">
                <tr>
                    <th> Rank </th>
                    <th> Camper Name </th>
                    <th> Brownie Points: last 30 days </th>
                    <th> Brownie Points: all time </th> 
                </tr>

            </table>
        )
    },

    renderRecent: function(){
        return(
            <table className="table 
            table-stripped 
            table-bordered 
            table-responsive">
                <tr>
                    <th> Rank </th>
                    <th> Camper Name </th>
                    <th> Brownie Points: last 30 days </th>
                    <th> Brownie Points: all time </th> 
                </tr>
                <trbody>
                    {this.state.recent.map(this.eachRecord)}
                </trbody>
            </table>
        )
    },

    render: function(){
        console.log(this.state)
        if(this.state.order == "recent"){
            //render recent
            return this.renderRecent();
        } else if(this.state.order == "alltime") {
            //render alltime
            return this.renderAlltime();
        }

    }
})


React.render(<Board/>, 
    document.getElementById('container'));
