import { Button } from "@repo/ui/components/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { useMachine } from "@xstate/react";
import React, { useState } from "react";
import { createMachine } from "xstate";
const createPluginMachine = (pluginType: string) =>
  createMachine({
    id: pluginType,
    initial: "idle",
    states: {
      idle: { on: { ACTIVATE: "active" } },
      active: { on: { DEACTIVATE: "idle" } }
    }
  });

interface PluginProps {
  pluginType: string;
  id: number;
}

const Plugin: React.FC<PluginProps> = ({ pluginType, id }) => {
  // Jede Plugin-Komponente initialisiert ihre eigene Machine
  const [state, send] = useMachine(createPluginMachine(pluginType));

  return (
    <div style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
      <h3>
        {pluginType} Plugin #{id}
      </h3>
      <p>Zustand: {state.value.toString()}</p>
      <Button className="m-1" onClick={() => send({ type: "ACTIVATE" })}>
        Aktivieren
      </Button>
      <Button className="m-1" onClick={() => send({ type: "DEACTIVATE" })}>
        Deaktivieren
      </Button>
    </div>
  );
};

const PluginProvider: React.FC = () => {
  // Liste der aktuell erstellten Plugins (hier nur Typ und eindeutige ID)
  const [plugins, setPlugins] = useState<{ pluginType: string; id: number }[]>([]);
  // Ausgewählter Plugin-Typ aus dem Dropdown
  const [selectedType, setSelectedType] = useState<string>("Kemper");

  const handleAddPlugin = () => {
    const newId = plugins.length + 1;
    setPlugins([...plugins, { pluginType: selectedType, id: newId }]);
  };

  return (
    <div>
      <h2>Plugin Provider</h2>
      <div>
        <div className="m-1">
          <Select onValueChange={(e) => setSelectedType(e)} value={selectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Kemper">Kemper</SelectItem>
                <SelectItem value="Lightshow">Lightshow</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button className="m-1" onClick={handleAddPlugin}>
          Plugin hinzufügen
        </Button>
      </div>
      <div>
        {plugins.map((plugin) => (
          <Plugin key={plugin.id} pluginType={plugin.pluginType} id={plugin.id} />
        ))}
      </div>
    </div>
  );
};

export default PluginProvider;
