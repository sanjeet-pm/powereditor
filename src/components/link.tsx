import { useSlate } from 'slate-react'
import {
    Transforms,
    Editor,
    Element as SlateElement,
} from 'slate';
import { DefaultButton, Panel, PanelType, PrimaryButton } from '@fluentui/react';
import { useCallback, useEffect } from 'react';
import { useBoolean } from '@fluentui/react-hooks';
import { Stack, IStackTokens } from '@fluentui/react/lib/Stack';
import { ELEMENT_LINK, getBlockAbove, insertNodes, unwrapNodes } from '@udecode/plate';
import { Subscription } from 'rxjs';
import { getSelection } from '../services/selection.service';
import { ELEMENT_POWERLINK, ELEMENT_POWERLINK_INPUT, getPowerLinkInputType } from '../packages/powerlink';
import { panelService } from '../services/panel.service';
const stackTokens: IStackTokens = { childrenGap: 10 };


export const isLinkActive = (editor: any) => {
    const [link] = Editor.nodes(editor, {
        match: n =>
            !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === ELEMENT_LINK,
    })
    return !!link
}

export const PowerLinkPanel = (props: any) => {
    const [isOpen, { toggle: toggleHideDialog, setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
    const editor = useSlate();
    let subscription: Subscription;
    useEffect(() => {
        // eslint-disable-next-line
        subscription = panelService.getMessage().subscribe(message => {
            console.log(message);
            openPanel();
        });
        return () => subscription.unsubscribe();
    }, [])

    const insertSelectedItem = (url: string, display_text: string) => {
        const targetRange = getSelection();
        if (!targetRange) return;
        // const type = getPlatePluginType(editor, pluginKey);
        const pathAbove = getBlockAbove(editor)?.[1];
        const isBlockEnd =
            editor.selection &&
            pathAbove &&
            Editor.isEnd(editor, editor.selection.anchor, pathAbove);

        Editor.withoutNormalizing(editor, () => {
            if (isBlockEnd) {
                Transforms.insertText(editor, ' ');
            }
            Transforms.select(editor, targetRange);
            Transforms.removeNodes(editor, {
                match: (node: any) => node.type === ELEMENT_POWERLINK_INPUT,
            });
            unwrapNodes(editor, { match: (node: any) => node.type === ELEMENT_POWERLINK_INPUT });
            insertNodes(editor, {
                type: ELEMENT_POWERLINK,
                children: [{ text: display_text }],
                value: url,
            });
            Transforms.move(editor);
            dismissPanel();
        });
    }
    const onRenderFooterContent = useCallback(
        () => {
            const buttonStyles = { root: { marginRight: 4 } };
            const saveDialog = async () => {
                insertSelectedItem('https://www.google.com', 'Incomeplete');
            }
            return (
                <div>
                    <PrimaryButton styles={buttonStyles} onClick={saveDialog} text="Save" />
                    <DefaultButton styles={buttonStyles} onClick={dismissPanel} text="Close" />
                </div>
            )
        },
        // eslint-disable-next-line
        [dismissPanel, toggleHideDialog, editor]);
    return (
        <div>
            <Panel
                isOpen={isOpen}
                type={PanelType.custom}
                customWidth={'320px'}
                headerText='Power Link'
                isFooterAtBottom={true}
                onRenderFooterContent={onRenderFooterContent}
                onDismiss={toggleHideDialog}
            >
                <Stack tokens={stackTokens}>
                    Sanjeet Singh
                </Stack>
            </Panel>
        </div>
    )
}
