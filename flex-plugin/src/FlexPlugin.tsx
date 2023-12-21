import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';

const PLUGIN_NAME = 'FlexPlugin';

export default class FlexPluginChromeExtension extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex: typeof Flex, manager: Flex.Manager): Promise<void> {
    removePanel2IfRunningFromChromeExtension(flex, manager);    
  }
}

function removePanel2IfRunningFromChromeExtension(flex: typeof Flex, manager: Flex.Manager) {
  try {    
    const baseUrl = window.location.ancestorOrigins[0];
    if (baseUrl.startsWith('chrome-extension://')) {

      // Remove Panel2
      manager.updateConfig({
        componentProps: {
          AgentDesktopView: {
            showPanel2: false
          }
        }
      })      

      // Remove Menu
      flex.MainHeader.Content.remove('sidenav-button')
    }
  } catch(e) {
    console.error('removePanel2IfRunningFromChromeExtension catch: ', e);
  }
}