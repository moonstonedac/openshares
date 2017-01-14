import React from "react";
import {PropTypes} from "react-router";
import Immutable from "immutable";
import AccountImage from "../Account/AccountImage";
import ChainTypes from "../Utility/ChainTypes";
import BindToChainState from "../Utility/BindToChainState";
import {ChainStore} from "openshares-lib";
import FormattedAsset from "../Utility/FormattedAsset";
import Translate from "react-translate-component";
import connectToStores from "alt/utils/connectToStores";
import SettingsActions from "actions/SettingsActions";
import SettingsStore from "stores/SettingsStore";

@BindToChainState({keep_updating: true})
class CouncilMemberCard extends React.Component {

    static propTypes = {
        council_member: ChainTypes.ChainAccount.isRequired
    };

    static contextTypes = {
        history: PropTypes.history
    };

    _onCardClick(e) {
        e.preventDefault();
        this.context.history.pushState(null, `/account/${this.props.council_member.get("name")}`);
    }

    render() {
        let council_member_data = ChainStore.getCouncilMemberById( this.props.council_member.get("id") )

        if (!council_member_data) {
            return null;
        }

        return (
            <div className="grid-content account-card" onClick={this._onCardClick.bind(this)}>
                <div className="card">
                    <h4 className="text-center">{this.props.council_member.get("name")}</h4>
                    <div className="card-content clearfix">
                        <div className="float-left">
                            <AccountImage account={this.props.council_member.get("name")} size={{height: 64, width: 64}}/>
                        </div>
                        <ul className="balances">
                            <li><Translate content="account.votes.votes" />: <FormattedAsset decimalOffset={5} amount={council_member_data.get("total_votes")} asset={"1.3.0"}/></li>
                        </ul>                        
                    </div>
                </div>
            </div>
        );
    }
}

@BindToChainState({keep_updating: true})
class CouncilMemberRow extends React.Component {

    static propTypes = {
        council_member: ChainTypes.ChainAccount.isRequired
    };

    static contextTypes = {
        history: PropTypes.history
    };

    _onRowClick(e) {
        e.preventDefault();
        this.context.history.pushState(null, `/account/${this.props.council_member.get("name")}`);
    }

    render() {
        let {council_member, rank} = this.props;
        let council_member_data = ChainStore.getCouncilMemberById( council_member.get("id") )
        if ( !council_member_data ) return null;
        let total_votes = council_member_data.get( "total_votes" );

        let url = council_member_data.get("url");

        url = url && url.length > 0 && url.indexOf("http") === -1 ? "http://" + url : url;

        return (
            <tr>
                <td onClick={this._onRowClick.bind(this)}>{rank}</td>
                <td onClick={this._onRowClick.bind(this)}>{council_member.get("name")}</td>
                <td onClick={this._onRowClick.bind(this)}><FormattedAsset amount={council_member_data.get('total_votes')} asset="1.3.0" /></td>
                <td><a href={url} target="_blank">{council_member_data.get("url")}</a></td>
            </tr>
        )
    }
}

@BindToChainState({keep_updating: true, show_loader: true})
class CouncilMemberList extends React.Component {
    static propTypes = {
        council_members: ChainTypes.ChainObjectsList.isRequired
    }

    constructor () {
        super();
        this.state = {
          sortBy: 'rank',
          inverseSort: true
        };
    }

    _setSort(field) {
        this.setState({
            sortBy: field,
            inverseSort: field === this.state.sortBy ? !this.state.inverseSort : this.state.inverseSort
        });
    }

    render() {
        let {council_members, cardView, membersList} = this.props;
        let {sortBy, inverseSort} = this.state;

        let itemRows = null;

        let ranks = {};

        council_members
        .filter(a => {
            if (!a) {
                return false;
            }
            return membersList.indexOf(a.get("id")) !== -1;
        })
        .sort((a, b) => {
            if (a && b) {
                return parseInt(b.get("total_votes"), 10) - parseInt(a.get("total_votes"), 10);
            }
        })
        .forEach( (c, index) => {
            if (c) {
                ranks[c.get("id")] = index + 1;
            }
        });

        if (council_members.length > 0 && council_members[1]) {
            itemRows = council_members
                .filter(a => {
                    if (!a) {return false; }
                    let account = ChainStore.getObject(a.get("council_member_account"));
                    if (!account) { return false; }
                    
                    return account.get("name").indexOf(this.props.filter) !== -1;
                    
                })
                .sort((a, b) => {
                    let a_account = ChainStore.getObject(a.get("council_member_account"));
                    let b_account = ChainStore.getObject(b.get("council_member_account"));
                    if (!a_account || !b_account) {
                        return 0;
                    }

                    switch (sortBy) {
                        case 'name':
                            if (a_account.get("name") > b_account.get("name")) {
                                return inverseSort ? 1 : -1;
                            } else if (a_account.get("name") < b_account.get("name")) {
                                return inverseSort ? -1 : 1;
                            } else {
                                return 0;
                            }
                            break;

                        case "rank":
                            return !inverseSort ? ranks[b.get("id")] - ranks[a.get("id")] : ranks[a.get("id")] - ranks[b.get("id")];
                            break;

                        default:
                            return !inverseSort ? parseInt(b.get(sortBy), 10) - parseInt(a.get(sortBy), 10) : parseInt(a.get(sortBy), 10) - parseInt(b.get(sortBy), 10);
                    }
                })
                .map((a) => {
                    if (!cardView) {
                        return (
                            <CouncilMemberRow key={a.get("id")} rank={ranks[a.get("id")]} council_member={a.get("council_member_account")} />
                        );
                    } else {
                        return (
                            <CouncilMemberCard key={a.get("id")} rank={ranks[a.get("id")]} council_member={a.get("council_member_account")} />
                        );
                    }
                });
        }

        // table view
        if (!cardView) {
            return (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className="clickable" onClick={this._setSort.bind(this, 'rank')}><Translate content="explorer.delegates.rank" /></th>
                            <th className="clickable" onClick={this._setSort.bind(this, 'name')}><Translate content="account.votes.name" /></th>
                            <th className="clickable" onClick={this._setSort.bind(this, 'total_votes')}><Translate content="account.votes.votes" /></th>
                            <th ><Translate content="account.votes.url" /></th>
                        </tr>
                    </thead>
                <tbody>
                    {itemRows}
                </tbody>

            </table>
            )
        }
        else {
            return (
                <div className="grid-block small-up-1 medium-up-2 large-up-3">
                    {itemRows}
                </div>
            );
        }
    }
}

@BindToChainState({keep_updating: true})
class CouncilMembers extends React.Component {

    static propTypes = {
        globalObject: ChainTypes.ChainObject.isRequired
    }

    static defaultProps = {
        globalObject: "2.0.0"
    }

    constructor(props) {
        super(props);
        this.state = {
            filterCouncilMember: props.filterCouncilMember || "",
            cardView: props.cardView
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            !Immutable.is(nextProps.globalObject, this.props.globalObject) ||
            nextState.filterCouncilMember !== this.state.filterCouncilMember ||
            nextState.cardView !== this.state.cardView
        );
    }

    _onFilter(e) {
        e.preventDefault();
        this.setState({filterCouncilMember: e.target.value.toLowerCase()});

        SettingsActions.changeViewSetting({
            filterCouncilMember: e.target.value.toLowerCase()
        });
    }

    _toggleView() {
        SettingsActions.changeViewSetting({
            cardViewCouncil: !this.state.cardView
        });

        this.setState({
            cardView: !this.state.cardView
        });
    }

    render() {
        let {globalObject} = this.props;
        globalObject = globalObject.toJS();

        let activeCouncilMembers = [];
        for (let key in globalObject.active_council_members) {
            if (globalObject.active_council_members.hasOwnProperty(key)) {
                activeCouncilMembers.push(globalObject.active_council_members[key]);
            }
        }
      
        return (
            <div className="grid-block">
                <div className="grid-block page-layout">
                    <div className="grid-block small-5 medium-3">
                        <div className="grid-content">
                            <h5><Translate content="explorer.council_members.active" />: {Object.keys(globalObject.active_council_members).length}</h5>
                            <br/>
                            <div className="view-switcher">
                                <span className="button outline" onClick={this._toggleView.bind(this)}>{!this.state.cardView ? <Translate content="explorer.delegates.card"/> : <Translate content="explorer.delegates.table"/>}</span>
                            </div>
                        </div>

                    </div>
                    <div className="grid-block vertical">
                            <div className="grid-block vertical small-12 medium-6">
                                <Translate component="h3" content="markets.filter" />
                                <input type="text" value={this.state.filterCouncilMember} onChange={this._onFilter.bind(this)} />
                            </div>
                            <CouncilMemberList
                                council_members={Immutable.List(globalObject.active_council_members)}
                                membersList={globalObject.active_council_members}
                                filter={this.state.filterCouncilMember}
                                cardView={this.state.cardView}
                            />
                        </div>
                </div>
            </div>
        );
    }
}

@connectToStores
class CouncilMembersStoreWrapper extends React.Component {
    static getStores() {
        return [SettingsStore]
    }

    static getPropsFromStores() {
        return {
            cardView: SettingsStore.getState().viewSettings.get("cardViewCouncil"),
            filterCouncilMember: SettingsStore.getState().viewSettings.get("filterCouncilMember"),
        }
    }

    render () {
        return <CouncilMembers {...this.props}/>
    }
}

export default CouncilMembersStoreWrapper;
