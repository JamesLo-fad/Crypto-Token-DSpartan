import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
    const [isDisabled, setDisable] = useState(false);
    const [buttonText, setText] = useState("Gimme gimme");

    async function handleClick(event) {
        setDisable(true);

        //when it's localhost, please comment 13-20
        const authClient = await AuthClient.create();
        const identity = await authClient.getIdentity();

        const authenticatedCanister = createActor(canisterId, {
            agentOptions: {
                identity
            }
        });

        //change authenticatedCanister.payOut() to token.payOut() when it's localhost
        const result = await authenticatedCanister.payOut();
        // const result = await token.payOut();
        setText(result);
        // setDisable(false);
    }

    return (
        <div className="blue window">
            <h2>
                <span role="img" aria-label="tap emoji">
                    🚰
                </span>
                Faucet
            </h2>
            <label>
                Get your free DSpartan tokens here! Claim 10,000 SPARTAN tokens
                to your {props.userPrincipal}.
            </label>
            <p className="trade-buttons">
                <button
                    id="btn-payout"
                    onClick={handleClick}
                    disabled={isDisabled}
                >
                    {buttonText}
                </button>
            </p>
        </div>
    );
}

export default Faucet;
