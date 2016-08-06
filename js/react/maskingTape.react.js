import React from 'react';
import $ from 'jquery';
import numeral from 'numeral';

const main = {
        background: 'limegreen',
        fontFamily: 'Source Sans Pro, sans-serif',
        fontSize: 'small',
        width: '100%',
        height: '100%'
    };

class MaskingTape extends React.Component {

    constructor(props) {
        super(props);
        this.ETFList = ['BLV','VOO','BIV','IAU','DBC'];
        this.state = {
            ETFS: {},
            savings: 0
        };

        this.savingsUpdate = this.savingsUpdate.bind(this);
    }

    componentDidMount(){
        this.ETFList.forEach((ETF) => {
            this.getClosePrice(ETF);
        });
    }

    getClosePrice(symbol) {
        let lastDay, dayBefore_mon, fiveDaysBefore_mon;
        const dayBefore = new Date();
              dayBefore.setDate(dayBefore.getDate()-1);
        const dayBefore_day = dayBefore.getDate();
              dayBefore_mon = dayBefore.getMonth();
              dayBefore_mon = dayBefore_mon < 9 ? "0" + (dayBefore_mon+1) : (dayBefore_mon+1);
        const dayBefore_yr  = dayBefore.getFullYear(),
              endDate = dayBefore_yr + "-" + dayBefore_mon + "-" + dayBefore_day,

              fiveDaysBefore = new Date();
              fiveDaysBefore.setDate(fiveDaysBefore.getDate()-5);
        const fiveDaysBefore_day = fiveDaysBefore.getDate();
              fiveDaysBefore_mon = fiveDaysBefore.getMonth();
              fiveDaysBefore_mon = fiveDaysBefore_mon < 9 ? "0" + (fiveDaysBefore_mon+1) : (fiveDaysBefore_mon+1);
        const fiveDaysBefore_yr  = fiveDaysBefore.getFullYear(),
              starDate = fiveDaysBefore_yr + "-" + fiveDaysBefore_mon + "-" + fiveDaysBefore_day,

              url = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' + symbol + 
                    '%22%20and%20startDate%20%3D%20%22' + starDate + '%22%20and%20endDate%20%3D%20%22' + endDate + 
                    '%22&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

        $.getJSON( url, (data) => {
            if (!data.query.results) { 
                setTimeout(() => {
                    $.getJSON( url, (data) => {
                        lastDay = data.query.results.quote[0];
                        let ETFS = this.state.ETFS;
                        ETFS[symbol] = lastDay.Close;
                        this.setState({ETFS})
                    });
                }, 10000);
            } else {
                lastDay = data.query.results.quote[0];
                let ETFS = this.state.ETFS;
                ETFS[symbol] = lastDay.Close;
                this.setState({ETFS})
            }
        });
    }

    savingsUpdate(event){
        const savings = event.target.value;
        this.setState({savings})
    }

    render() {
        const savings = this.state.savings,
              ETFS = this.state.ETFS;
        return (
        <div style={main}>
            <div style={{}}>
                Mimic the All Weather <a href='http://fortune.com/2016/07/07/bridgewater-hedge-fund-ray-dalio/'>Fund</a>:<br/>
                <input onChange={this.savingsUpdate} type='number'></input>
                Total Savings: ${numeral(savings).format('0,0.00')}<br/><br/>

                # of {numeral(savings*0.40/ETFS['BLV']).format('0,0')} BLV:Vanguard Long-Term Bond ETF<br/>
                PricePer:{ETFS['BLV']}-40% of savings<br/><br/>
                # of {numeral(savings*0.30/ETFS['VOO']).format('0,0')} VOO:Vanguard S&P 500 ETF<br/>
                PricePer:{ETFS['VOO']}-30% of savings<br/><br/>
                # of {numeral(savings*0.15/ETFS['BIV']).format('0,0')} BIV:Vanguard Intermediate-Term Bond ETF<br/>
                PricePer:{ETFS['BIV']}-15% of savings<br/><br/>
                # of {numeral(savings*0.075/ETFS['IAU']).format('0,0')} IAU:iShares Gold Trust ETF<br/>
                PricePer:{ETFS['IAU']}-7.5% of savings<br/><br/>
                # of {numeral(savings*0.075/ETFS['DBC']).format('0,0')} DBC:PowerShares DB Commodity Index Tracking ETF<br/>
                PricePer:{ETFS['DBC']}-7.5% of savings<br/><br/>
            </div>
        </div>
        );
    }
}

export default MaskingTape;
