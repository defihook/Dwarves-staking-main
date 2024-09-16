import ProcessBar from "./ProcessBar";
import { ClaimButton } from "./styleHook";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { calculateAvailableReward, claimReward, getGlobalState } from "../contexts/helper";
import { SHOW_REWARD_FIXED } from "../config";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import tokenImage from '../assets/img/tokenImage.gif';

export default function HomeBanner({ forceRender, ...props }) {
	const wallet = useWallet();
	const [loading, setLoading] = useState(false);
	const [rewardValue, setRewardValue] = useState(0);
	const [totalGlabalStakedCnt, setTotalGlabalStakedCnt] = useState(0);
	const [hide, setHide] = useState(false);

	const getReward = async () => {
		const reward = await calculateAvailableReward(wallet.publicKey);
		setRewardValue(reward);
	}
	const onClaim = () => {
		claimReward(wallet, () => setLoading(true), () => setLoading(false));
		setHide(!hide);
	}

	const getGlobalStateNFTs = async () => {
		const list = await getGlobalState();
		setTotalGlabalStakedCnt(list.fixedNftCount.toNumber());
	}
	const updateBannerStates = () => {
		const intv = setInterval(() => {
			getGlobalStateNFTs();
			getReward();
		}, 5000);
		return intv;
	}

	useEffect(() => {
		let intv = -1;
		if (wallet.publicKey !== null) {
			intv = updateBannerStates();
		}
		return () => {
			if (intv !== -1) {
				clearInterval(intv);
				console.log('clear interval', intv);
			}
		}
		// eslint-disable-next-line
	}, [wallet.connected, hide])

	return (
		<>
			{
				wallet.publicKey === null ? 
				<>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={12} md={8}>
							<Typography variant="h2" gutterBottom component="div" className="title-text">
								Earn <span className="under-text"><strong>$KCRWN</strong></span> By Staking Your Kingdom Of Dwarves
							</Typography>
							<Typography variant="h4" gutterBottom component="div" className="title-text">
								What is staking?
							</Typography>
							<Typography variant="h5" gutterBottom component="div" className="under-text">
								Staking is a way to put your asset to work and earn rewards on it.
							</Typography>
							<Typography variant="h4" gutterBottom component="div" className="title-text">
								How does staking work?
							</Typography>
							<Typography variant="h5" gutterBottom component="div" className="under-text">
								You send your NFT to KCRWN staking smart contract from the web site <a href="https://www.kingdomofdwarves.io/" target="_blank" rel="noreferrer">kingdomofdwarves.io</a>. You earn <span>$KCRWN</span> while your NFT is staked here.
							</Typography>
							<Typography variant="h4" gutterBottom component="div" className="title-text">
								Why should I stake?
							</Typography>
							<Typography variant="h5" gutterBottom component="div" className="under-text">
								You can earn passive income by staking your NFT.
							</Typography>
							<Typography variant="h4" gutterBottom component="div" className="title-text">
								What should I do with my staking rewards?
							</Typography>
							<Typography variant="h5" gutterBottom component="div" className="under-text">
								Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							</Typography>
							<Typography variant="h4" gutterBottom component="div" className="title-text">
								When should I withdraw my NFT?
							</Typography>
							<Typography variant="h5" gutterBottom component="div" className="under-text">
								Whenever you want. But keep in mind that you won't be able to get any more staking income.
							</Typography>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
						<img 
							src={tokenImage}
							alt="tokenImage"
							className="tokenImage"
						/>
					</Grid>
					</Grid>
				</>
				:
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={8}>
						<div>
							<Typography variant="h3" gutterBottom component="div" className="title-text">
								KINGDOM OF DWARVES STAKING
							</Typography>
							<ProcessBar value={totalGlabalStakedCnt} forceRender={hide} />
						</div>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<div className="claim-box">
							<div className="claim-title">
								<div className="claim-title-content">
									<p>$KCRWN</p>
									<h2>{rewardValue.toFixed(SHOW_REWARD_FIXED)}</h2>
								</div>
							</div>
							<p>Accumulated Rewards Amount</p>
							<ClaimButton disabled={loading} onClick={() => onClaim()}>
								{!loading ?
									<>
										Claim $KCRWN
									</>
									:
									<SyncLoader color="#B22234" size={15} />
								}
							</ClaimButton>
						</div>
					</Grid>
				</Grid>
			}
		</>
	)
}
