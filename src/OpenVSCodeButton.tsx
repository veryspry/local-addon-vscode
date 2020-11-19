import { exec } from 'child_process';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import { TextButton, FlyModal, Title, Text } from '@getflywheel/local-components';

interface IOpenVSCodeButtonProps {
	site: any;
}

const renderErrorModal = () => {
	const vsCodeUrl = 'https://code.visualstudio.com/';
	const codeCliUrl = 'https://code.visualstudio.com/docs/editor/command-line';

	ReactDOM.render(
		(
			<FlyModal
				contentLabel='Error opening VSCode'
			>
				<div className="VSCode_Addon_Modal">
					<Title>Uh-oh! Looks like there was an error trying to open VSCode</Title>
					<Text>
						This add-on relies on
						<TextButton
							onClick={() => ipcRenderer.send('browserService:launch', null, vsCodeUrl)}
							className="VSCode_Addon_Link_TextButton"
							privateOptions={{
								textTransform: 'none',
							}}
						>
							{' VSCode '}
						</TextButton>
						and the
						<TextButton
							onClick={() => ipcRenderer.send('browserService:launch', null, codeCliUrl)}
							className="VSCode_Addon_Link_TextButton"
							privateOptions={{
								textTransform: 'none',
							}}
						>
							{' '}code{' '}
						</TextButton>
						CLI to run. Ensure you have both of those installed and try again.
					</Text>
				</div>
			</FlyModal>
		), document.getElementById('popup-container'),
	);
}


export const OpenVSCodeButton: React.FC<IOpenVSCodeButtonProps> = (props) => {
	const { site } = props;

	const [isOpening, setIsOpening] = useState(false);

	const openWithVSCodeCLI = (path: string) => {
		setIsOpening(true);
		const cmd = `code ${path.replace(/(\s+)/g, '\\$1')}`;

		exec(cmd, (err, stdout, stderr) => {
			setIsOpening(false);

			if (err) {
				renderErrorModal();
			}
		});
	}

	return (
		<TextButton
			onClick={() => openWithVSCodeCLI(site.path)}
			disabled={isOpening}
		>
			Open in VSCode
		</TextButton>
	);
};
