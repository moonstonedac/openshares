import React from "react";
import counterpart from "counterpart";
import Translate from "react-translate-component";
import SettingsActions from "actions/SettingsActions";

export default class SettingsEntry extends React.Component {

    _onConfirm() {
        SettingsActions.changeSetting({setting: "apiServer", value: this.props.apiServer });
        setTimeout(this._onReloadClick, 250);
    }

    _onReloadClick() {
        window.location.href = "/";
    }

    render() {
        let {defaults, setting, settings, apiServer} = this.props;
        let options, optional, confirmButton, value, input, selected = settings.get(setting);

        let myLocale = counterpart.getLocale();

        switch (setting) {
        case "locale":
            value = selected;
            options = defaults.map(entry => {
                let translationKey = "languages." + entry;
                let value = counterpart.translate(translationKey);

                return <option key={entry} value={entry}>{value}</option>;
            });

            break;

        case "themes":
            value = selected;
            options = defaults.map(entry => {
                let translationKey = "settings." + entry;
                let value = counterpart.translate(translationKey);

                return <option key={entry} value={entry}>{value}</option>;
            });

            break;

        case "defaultMarkets":
            options = null;
            value = null;
            break;

        case "apiServer":
            // console.log("defaults:", defaults, apiServer);
            // value = defaults.indexOf(apiServer) !== -1 ? apiServer : ;
            value = defaults.reduce((final, entry) => {
                return entry.url === apiServer ? apiServer : final;
            }, null) || defaults[0];
            options = defaults.map(entry => {
                let option = entry.translate ? counterpart.translate(`settings.${entry.translate}`) : entry;
                let key = entry.translate ? entry.translate : entry;
                return <option value={option.url} key={key.url}>{option.location || option.url} {option.location ? `(${option.url})` : null}</option>;
            });

            let confirmButton = (
                <div className="button-group" style={{padding: "10px"}}>
                    <div onClick={this._onConfirm.bind(this)} className="button outline">
                        <Translate content="transfer.confirm" />
                    </div>

                    <div
                        onClick={this.props.triggerModal}
                        className="button outline"
                        id="add"
                    >
                            <Translate id="add_text" content="settings.add_api" />
                    </div>

                    <div
                        onClick={this.props.triggerModal}
                        id="remove"
                        className="button outline"
                    >
                        <Translate id="remove_text" content="settings.remove_api" />
                    </div>

                </div>
            );

            optional = (
                <div style={{position: "absolute", right: 0, top: "0.2rem"}}>


                </div>);

            break;

        case "walletLockTimeout":
            value = selected;
            input = <input type="text" value={selected} onChange={this.props.onChange.bind(this, setting)}/>;
            break;

        case "faucet_address":
            if (!selected) {
                value = "https://";
            } else {
                value = selected;
            }
            input = <input type="text" defaultValue={value} onChange={this.props.onChange.bind(this, setting)}/>;
            break;

        default:

            if (typeof selected === "number") {
                value = defaults[selected];
            }
            else if(typeof selected === "boolean") {
                if (selected) {
                    value = defaults[0];
                } else {
                    value = defaults[1];
                }
            }
            else if(typeof selected === "string") {
                value = selected;
            }


            if (defaults) {
                options = defaults.map((entry, index) => {
                    let option = entry.translate ? counterpart.translate(`settings.${entry.translate}`) : entry;

                    let key = entry.translate ? entry.translate : entry;
                    return <option value={entry.translate ? entry.translate : entry} key={key}>{option}</option>;
                });
            } else {
                input = <input type="text" defaultValue={value} onBlur={this.props.onChange.bind(this, setting)}/>;
            }
            break;

        }



        if (!value && !options) return null;

        if (value && value.translate) {
            value = value.translate;
        }

        return (
            <section className="block-list">
                <header><Translate component="span" content={`settings.${setting}`} /></header>
                {options ? <ul>
                    <li className="with-dropdown">
                        {optional}
                        <select value={value} onChange={this.props.onChange.bind(this, setting)}>
                            {options}
                        </select>
                        {confirmButton}
                    </li>
                </ul> : null}
                {input ? <ul><li>{input}</li></ul> : null}
            </section>
        );
    }
}
