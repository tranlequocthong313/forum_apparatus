import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import { Grow, MenuItem, MenuList, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

const Arrow = styled('span')({
	position: 'absolute',
	fontSize: 7,
	width: '3em',
	height: '3em',
	'&::before': {
		content: '""',
		margin: 'auto',
		display: 'block',
		width: 0,
		height: 0,
		borderStyle: 'solid',
	},
})

const StyledPopper = styled(Popper)(({ theme }) => ({
	zIndex: 1,
	'&[data-popper-placement*="bottom"] .arrow': {
		top: 0,
		left: 0,
		marginTop: '-0.9em',
		width: '3em',
		height: '1em',
		'&::before': {
			content: '""',
			position: 'absolute',
			borderWidth: '0 1em 1em 1em',
			borderStyle: 'solid',
			borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
		},
	},
	'&[data-popper-placement*="top"] .arrow': {
		bottom: 0,
		left: 0,
		marginBottom: '-0.9em',
		width: '3em',
		height: '1em',
		'&::before': {
			borderWidth: '1em 1em 0 1em',
			borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
		},
	},
	'&[data-popper-placement*="right"] .arrow': {
		left: 0,
		marginLeft: '-0.9em',
		height: '3em',
		width: '1em',
		'&::before': {
			borderWidth: '1em 1em 1em 0',
			borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
		},
	},
	'&[data-popper-placement*="left"] .arrow': {
		right: 0,
		marginRight: '-0.9em',
		height: '3em',
		width: '1em',
		'&::before': {
			borderWidth: '1em 0 1em 1em',
			borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
		},
	},
}));


const expandOptions = [
	'New post',
	'New profile post',
	'Latest activities'
];

const SplitButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
	const [open, setOpen] = React.useState(false);
	// const arrowRef = React.useRef<HTMLSpanElement | null>(null);
	const anchorRef = React.useRef<HTMLDivElement>(null);
	const expandButtonRef = React.useRef<HTMLButtonElement>(null);
	const [arrowRef, setArrowRef] = React.useState<HTMLSpanElement | null>(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);

	const [arrowPosition, setArrowPosition] = React.useState(0);

	React.useEffect(() => {
		if (!open && expandButtonRef.current && anchorRef.current) {
			const buttonRect = expandButtonRef.current.getBoundingClientRect();
			const anchorRect = anchorRef.current.getBoundingClientRect();
			// const arrowPos = buttonRect.left - anchorRect.left + buttonRect.width / 2;
			const arrowPos = (anchorRect.width / 2) - (buttonRect.width / 2);
			console.log(arrowPos);
			setArrowPosition(arrowPos);
		}
	}, [open]);
	const handleClick = () => {
		console.info(`You clicked ${expandOptions[selectedIndex]}`)
		onClick()
	}

	const handleMenuItemClick = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		index: number,
	) => {
		setSelectedIndex(index);
		setOpen(false);
	}

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event: Event) => {
		if (
			anchorRef.current &&
			anchorRef.current.contains(event.target as HTMLElement)
		) {
			return;
		}

		setOpen(false);
	};

	return (
		<React.Fragment>
			<ButtonGroup
				variant={'contained'}
				ref={anchorRef}
				aria-label={'Button group'}
			>
				<Button onClick={handleClick}>{expandOptions[selectedIndex]}</Button>
				<Button
					size="small"
					aria-controls={open ? 'split-button-menu' : undefined}
					aria-label="select merge strategy"
					aria-haspopup="menu"
					onClick={handleToggle}
					ref={expandButtonRef}
				>
					<ArrowDropDownIcon />
				</Button>

			</ButtonGroup>
			<StyledPopper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal={true}
				placement="bottom-start"
				// className={classes.popper}
				modifiers={[
					{
						name: 'sameWidth',
						enabled: true,
						fn: ({ state }) => {
							state.styles.popper.minWidth = `${state.rects.reference.width}px`;
							state.styles.popper.width = 'auto';
						},
						phase: 'beforeWrite',
						requires: ['computeStyles'],
					},
					{
						name: 'flip',
						enabled: true,
						options: {
							altBoundary: true,
							rootBoundary: 'document',
							// padding: 8,
						},
					},
					{
						name: 'preventOverflow',
						enabled: true,
						options: {
							altAxis: true,
							altBoundary: true,
							tether: true,
							rootBoundary: 'document',
							// padding: 8,
						},
					},
					{
						name: 'arrow',
						enabled: true,
						options: {
							element: arrowRef,
						},
					},
				]}
			>

				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === 'bottom' ? 'center top' : 'center bottom',
						}}
					>
						<Paper>
							<Arrow ref={setArrowRef} className={'arrow'} sx={{ ":before": { left: `${arrowPosition}px` } }} />
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id="split-button-menu" autoFocusItem>
									{expandOptions.map((option, index) => (
										<MenuItem
											key={option}
											disabled={index === 2}
											selected={index === selectedIndex}
											onClick={(event) => handleMenuItemClick(event, index)}
										>
											{option}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>

						</Paper>

					</Grow>

				)}
			</StyledPopper>
		</React.Fragment>
	)
}

export default SplitButton
