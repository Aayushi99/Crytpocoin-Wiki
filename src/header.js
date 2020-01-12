import React, { Component } from 'react';
import './header.css';

class Heading extends Component {

    constructor() {
        super();
        this.state = {
            flag: false,
            user: [],
            nme: null,
            first: null,
            country: null,
            date: null,
            market: null,
            coinrank: null,
            coinscore: null,
            developerscore: null,
            comunityscore: null,
            liquidityscore: null,
            piscore: null,
            symbol: null,
            query: '',
            image: ''
        }
        this.updateInput = this.updateInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    updateInput(e) {
        this.setState({ query: e.target.value });

        //console.log(e.target.value);
        // console.log(this.state.query);
    }
    handleClick(e) {
        //console.log(e.target);
        console.log(`Value is :${this.state.query}`);
        this.componentDidMount();
    }
    // createMarkup(description) {
    //     return {
    //         __html: description
    //     };
    // }

    render() {
        return (
            <div id="whole">

                <div>{this.state.flag ?
                    <div>
                        <header className="App-header">{this.state.nme}-{this.state.symbol}</header>
                        <div>
                            <h1 id="heading">Crypto Wiki</h1>
                            <input id="search" type="text" name="search" placeholder="Enter the Crypto Currency Name" onBlur={this.updateInput} size="39" />
                            <button type="button" className="queryVal" onClick={this.handleClick}>get info about coins</button>
                            <img src={this.state.image} alt="image" className="center"></img>



                            <div className="para" dangerouslySetInnerHTML={{ __html: this.state.first }} />

                            <div className="sidebar">
                                <p>Country of origin-{this.state.country}</p>
                                <p>Date of Appearance-  {this.state.date} </p>
                                <p>Coin Gecko-Rank- {this.state.coinrank}</p>
                                <p>Coin Gecko-Score - {this.state.coinscore} </p>
                                <p>Developer Score- {this.state.developerscore} </p>
                                <p>Community Score- {this.state.comunityscore} </p>
                                <p>Liquidity Score- {this.state.liquidityscore} </p>
                                <p>Public Interest Score- {this.state.piscore}</p>
                            </div>
                        </div> </div> : <h1 id="load">Wait till the data is loading</h1>}</div>

            </div>

        );
    }





    async componentDidMount() {
        //    const query= document.querySelector('.queryVal').value;

        try {

            const url = `https://api.coingecko.com/api/v3/coins/${this.state.query}`;
            console.log(url);
            const res = await fetch(url);
            const data = await res.json();
            //console.log(data)
            setTimeout(() => this.setState({ flag: true }), 1300);
            this.setState({ first: data.description.en, nme: data.name, symbol: data.symbol, country: data.country_origin, date: data.genesis_date, market: data.market_cap_rank, coinrank: data.coingecko_rank, coinscore: data.coingecko_score, developerscore: data.developer_score, comunityscore: data.community_score, liquidityscore: data.liquidity_score, piscore: data.public_interest_score, image: data.image.large });
            console.log(data);
            //this.setState({user:data.results[0].name.first,flag:true });
        }
        catch (error) {
            console.log(error);
        }

    }


}
// ReactDOM.render(<Heading />, document.getElementById('search'));
export default Heading;
