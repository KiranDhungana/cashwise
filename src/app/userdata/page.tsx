"use client";
import React, { useState, useEffect } from "react";
import { usePlaidLink, PlaidLinkOnSuccess } from "react-plaid-link";
import apiClient from "@/services/apiClient";
import axios from "axios";
import { config } from "process";

type ErrorInfo = {
  time: string;
  message: string;
};

const UserData: React.FC = () => {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<{
    transactions: { name: string; amount: number }[];
    accounts: { name: string; balance: { available: number } }[];
  } | null>(null);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);

  const recordError = (err: any, context: string) => {
    const msg = err?.message || JSON.stringify(err) || "Unknown error";
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Error in ${context}:`, err);
    setErrorInfo({ time: timestamp, message: `${context}: ${msg}` });
  };

  // 1) Fetch link token
  const fetchLinkToken = async () => {
    try {
      const { data } = await apiClient.post("/api/create_link_token");
      setLinkToken(data.link_token);
    } catch (err) {
      recordError(err, "fetchLinkToken");
    }
  };

  // 2) Handle Plaid success
  const handleOnSuccess: PlaidLinkOnSuccess = async (public_token) => {
    debugger;
    try {
      const exchangeRes = await apiClient.post("/api/exchange_public_token", {
        public_token,
      });
      const { access_token } = exchangeRes.data;

      const userDataRes = await apiClient.post("/api/get_user_data", {
        access_token,
        start_date: "2023-01-01",
        end_date: "2024-12-31",
      });
      console.log(userData, "this is user data");
      setUserData(userDataRes.data);
    } catch (err) {
      recordError(err, "handleOnSuccess");
    }
  };

  // 3) Handle Plaid UI errors
  const handleOnError: PlaidLinkOnError = (err: any) => {
    recordError(err, "PlaidLink onError");
  };

  useEffect(() => {
    fetchLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken!,
    onSuccess: (public_token, metadata) => {
      handleOnSuccess(public_token, metadata);
      // console.log(metadata);
    },
    onExit: handleOnError,
  });

  if (!linkToken) return <div>Loading link token…</div>;

  return (
    <div>
      <button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </button>

      {errorInfo && (
        <div style={{ marginTop: 16, color: "red" }}>
          <strong>Error at {errorInfo.time}:</strong> {errorInfo.message}
        </div>
      )}

      {userData && (
        <div style={{ marginTop: 20 }}>
          <h3>Transactions</h3>
          <ul>
            {userData.transactions.map((tx, i) => (
              <li key={i}>
                {tx.name}: ${tx.amount.toFixed(2)}
              </li>
            ))}
          </ul>

          <h3>Account Balances</h3>
          {/* <ul>
            {userData.accounts.map((acct, i) => (
              <li key={i}>
                {acct.name} — Available: ${acct.balance.available.toFixed(2)}
              </li>
            ))}
          </ul> */}
        </div>
      )}
    </div>
  );
};

export default UserData;
