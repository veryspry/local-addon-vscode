import { exec } from 'child_process';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
// import type { Site } from '@getflywheel/local/main'

// https://getflywheel.github.io/local-addon-api/modules/_local_renderer_.html
import * as LocalRenderer from '@getflywheel/local/renderer';

// https://github.com/getflywheel/local-components
import { TextButton, FlyModal, Title, Text } from '@getflywheel/local-components';

interface IOpenVSCodeButtonProps {
	site: any;
}

const vsCodeUrl = 'https://code.visualstudio.com/';
const codeCliUrl = 'https://code.visualstudio.com/docs/editor/command-line';

export const OpenVSCodeButton: React.FC<IOpenVSCodeButtonProps> = (props) => {
	const { site } = props;

	const [isOpening, setIsOpening] = useState(false);

	const openWithVSCodeCLI = (path: string) => {
		setIsOpening(true);
		const cmd = `code ${path.replace(/(\s+)/g, '\\$1')}`;
		console.log(path, cmd)

		exec(cmd, (err, stdout, stderr) => {
			setIsOpening(false);
			console.log(err, stdout, stderr);

			if (err) {
				renderErrorModal();
			}
		});
	}

	const renderErrorModal = () => {
		ReactDOM.render(
			(
				<FlyModal
					contentLabel='Confirm Optimization'
				>
					<Title>Uh-oh! Looks like there was an error trying to open VSCode</Title>
					<Text>
						This add-on relies on
						<TextButton
							onClick={() => ipcRenderer.send('browserService:launch', null, vsCodeUrl)}
						>
							{' '}VSCode{' '}
						</TextButton>
						and the
						<TextButton
							onClick={() => ipcRenderer.send('browserService:launch', null, codeCliUrl)}
						>
							{' '}code{' '}
						</TextButton>
						CLI to run.
					</Text>
				</FlyModal>
			), document.getElementById('popup-container'),
		);
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
