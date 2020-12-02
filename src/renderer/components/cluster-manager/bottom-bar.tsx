import "./bottom-bar.scss";

import React from "react";
import { observer } from "mobx-react";
import { Icon } from "../icon";
import { WorkspaceMenu } from "../+workspaces/workspace-menu";
import { workspaceStore } from "../../../common/workspace-store";
import { StatusBarRegistration, statusBarRegistry } from "../../../extensions/registries";

@observer
export class BottomBar extends React.Component {
  renderRegistrated(registration: StatusBarRegistration) {
    const { item } = registration;

    if (item) {
      return typeof item === "function" ? item() : item;
    }

    return <registration.components.Item />;
  }

  render() {
    const { currentWorkspace } = workspaceStore;
    // in case .getItems() returns undefined
    const items = statusBarRegistry.getItems() ?? [];

    return (
      <div className="BottomBar flex gaps">
        <div id="current-workspace" className="flex gaps align-center">
          <Icon smallest material="layers"/>
          <span className="workspace-name">{currentWorkspace.name}</span>
        </div>
        <WorkspaceMenu
          htmlFor="current-workspace"
        />
        <div className="extensions box grow flex gaps justify-flex-end">
          {items.map((registration, index) => {
            if (!registration.item && !registration.components.Item) {
              return;
            }

            return (
              <div className="flex align-center gaps item" key={index}>
                {this.renderRegistrated(registration)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
