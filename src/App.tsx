import { useState } from "react";
import { z } from "zod";
import {
  Button,
  Callout,
  Checkbox,
  Collapsible,
  CollapsibleSection,
  Copyable,
  Divider,
  DropdownChevron,
  EmptyState,
  ErrorText,
  FormProvider,
  useForm,
  FormInput,
  FormDollarInput,
  FormPercentInput,
  FormCheckbox,
  FormSelect,
  FormTextArea,
  FormSwitch,
  HeaderTile,
  InputBox,
  Label,
  LoadingBar,
  LoadingState,
  Modal,
  RadioButtonGroup,
  Select,
  MultiSelect,
  Skeleton,
  Spinner,
  Switch,
  TabGroup,
  Tabs,
  Tag,
  Text,
  TextArea,
  Tooltip,
  Menu,
} from "@candidhealth/react-vitals";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-3">
    <h2 className="text-lg font-medium text-gray-700">{title}</h2>
    {children}
  </section>
);

const demoFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  amount: z.number().nullable().optional(),
  rate: z.number().nullable().optional(),
  fruit: z.string().optional(),
  notes: z.string().optional(),
  agree: z.boolean(),
  notifications: z.boolean(),
});

const FormDemo = () => {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const form = useForm(demoFormSchema, {
    defaultValues: {
      name: "",
      email: "",
      amount: null,
      rate: null,
      fruit: undefined,
      notes: "",
      agree: false,
      notifications: true,
    },
  });

  return (
    <Section title="Form (react-hook-form + zod)">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            setSubmitted(JSON.stringify(data, null, 2));
          })}
          className="max-w-md space-y-4"
        >
          <FormInput name="name" label="Name" placeholder="Jane Doe" />
          <FormInput name="email" label="Email" placeholder="jane@example.com" type="email" />
          <FormDollarInput name="amount" label="Amount" />
          <FormPercentInput name="rate" label="Rate" />
          <FormSelect
            name="fruit"
            label="Favorite Fruit"
            items={[
              { value: "apple", label: "Apple" },
              { value: "banana", label: "Banana" },
              { value: "cherry", label: "Cherry" },
            ]}
            triggerPlaceholder="Pick a fruit..."
          />
          <FormTextArea name="notes" label="Notes" placeholder="Any additional notes..." />
          <div className="flex items-center gap-2">
            <FormCheckbox name="agree" />
            <Text variant="body-2">I agree to the terms</Text>
          </div>
          <FormSwitch name="notifications" label="Email notifications" />
          <div className="flex items-center gap-3 pt-2">
            <Button intent="primary" type="submit">Submit</Button>
            <Button intent="default" type="button" onClick={() => { form.reset(); setSubmitted(null); }}>
              Reset
            </Button>
          </div>
        </form>
      </FormProvider>
      {submitted && (
        <div className="mt-4">
          <Text variant="label">Submitted data:</Text>
          <pre className="mt-1 rounded-md bg-gray-100 p-3 text-xs text-gray-700">{submitted}</pre>
        </div>
      )}
    </Section>
  );
};

const selectItems = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

type DemoTab = "overview" | "details" | "settings";
const tabDefs: { id: DemoTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "details", label: "Details" },
  { id: "settings", label: "Settings" },
];

function App() {
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectValue, setSelectValue] = useState<string | undefined>(undefined);
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [radioValue, setRadioValue] = useState("option1");
  const [currentTab, setCurrentTab] = useState<DemoTab>("overview");
  const [tabGroupTab, setTabGroupTab] = useState<DemoTab>("overview");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-8 pb-20">
      <div>
        <Text variant="headline-4" as="h1">
          @candidhealth/react-vitals
        </Text>
        <Text variant="body-1" className="text-gray-500">
          Component library sandbox
        </Text>
      </div>

      <Divider />

      {/* Typography */}
      <Section title="Typography">
        <div className="space-y-2">
          <Text variant="headline-3" as="h3">Headline 3</Text>
          <Text variant="headline-4" as="h4">Headline 4</Text>
          <Text variant="title-1">Title 1</Text>
          <Text variant="title-2">Title 2</Text>
          <Text variant="title-3">Title 3</Text>
          <Text variant="body-1">Body 1 — The quick brown fox jumps over the lazy dog.</Text>
          <Text variant="body-2">Body 2 — The quick brown fox jumps over the lazy dog.</Text>
          <Text variant="label">Label text</Text>
          <Text variant="footnote">Footnote text</Text>
          <Text variant="smallcaps">Small caps text</Text>
        </div>
      </Section>

      <Divider />

      {/* Buttons */}
      <Section title="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button intent="primary">Primary</Button>
          <Button intent="default">Default</Button>
          <Button variant="transparent" intent="primary">Transparent</Button>
          <Button variant="dark" intent="primary">Dark</Button>
          <Button intent="danger">Danger</Button>
          <Button disabled>Disabled</Button>
          <Button size="sm" intent="primary">Small</Button>
          <Button size="xs" intent="primary">Extra Small</Button>
        </div>
      </Section>

      <Divider />

      {/* Callouts */}
      <Section title="Callout">
        <div className="space-y-2">
          <Callout intent="default">This is a default callout.</Callout>
          <Callout intent="primary">This is a primary callout.</Callout>
          <Callout intent="warning">This is a warning callout.</Callout>
          <Callout intent="danger">This is a danger callout.</Callout>
          <Callout intent="primary" title="With a title">
            Callouts can have both a title and body content.
          </Callout>
        </div>
      </Section>

      <Divider />

      {/* Labels & Tags */}
      <Section title="Label">
        <div className="flex flex-wrap gap-2">
          <Label intent="default">Default</Label>
          <Label intent="primary">Primary</Label>
          <Label intent="success">Success</Label>
          <Label intent="warning">Warning</Label>
          <Label intent="danger">Danger</Label>
          <Label intent="disabled">Disabled</Label>
          <Label variant="dark" intent="default">Dark</Label>
          <Label size="xs">Extra Small</Label>
          <Label size="lg">Large</Label>
        </div>
      </Section>

      <Section title="Tag">
        <div className="flex flex-wrap gap-2">
          <Tag>Default Tag</Tag>
          <Tag onRemove={() => alert("removed!")}>Removable</Tag>
        </div>
      </Section>

      <Divider />

      {/* Form Controls */}
      <Section title="InputBox">
        <div className="space-y-3">
          <InputBox>
            <InputBox.Input
              placeholder="Default input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </InputBox>
          <InputBox size="sm">
            <InputBox.Input placeholder="Small input" />
          </InputBox>
          <InputBox hasError>
            <InputBox.Input placeholder="Error state" />
          </InputBox>
          <InputBox variant="transparent">
            <InputBox.Input placeholder="Transparent variant" />
          </InputBox>
        </div>
      </Section>

      <Section title="TextArea">
        <div className="space-y-3">
          <TextArea
            placeholder="Enter some text..."
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
          />
          <TextArea placeholder="With error" hasError errorNode="This field is required" />
        </div>
      </Section>

      <Section title="ErrorText">
        <ErrorText>Something went wrong. Please try again.</ErrorText>
      </Section>

      <Divider />

      {/* Controls */}
      <Section title="Checkbox & Switch">
        <div className="flex items-center gap-8">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            Checkbox {checked ? "(checked)" : "(unchecked)"}
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
            Switch {switchOn ? "(on)" : "(off)"}
          </label>
        </div>
      </Section>

      <Section title="RadioButtonGroup">
        <RadioButtonGroup
          items={[
            { value: "option1", displayValue: "Option 1", description: "Description for option 1" },
            { value: "option2", displayValue: "Option 2", description: "Description for option 2" },
            { value: "option3", displayValue: "Option 3", description: "Description for option 3", disabled: true },
          ]}
          value={radioValue}
          onChange={setRadioValue}
        />
      </Section>

      <Divider />

      {/* Select */}
      <Section title="Select">
        <div className="flex gap-4">
          <div className="w-64 space-y-2">
            <Text variant="label">Single Select</Text>
            <Select
              items={selectItems}
              value={selectValue}
              onChange={setSelectValue}
              triggerPlaceholder="Choose a fruit..."
            />
          </div>
          <div className="w-64 space-y-2">
            <Text variant="label">Multi Select</Text>
            <MultiSelect
              items={selectItems}
              value={multiSelectValue}
              onChange={setMultiSelectValue}
              triggerPlaceholder="Choose fruits..."
            />
          </div>
        </div>
      </Section>

      <Divider />

      {/* Tabs */}
      <Section title="Tabs">
        <Tabs tabs={tabDefs} currentTab={currentTab} setCurrentTab={setCurrentTab}>
          <Tabs.TabContent id="overview">
            <div className="rounded-md border border-gray-200 bg-white p-4">
              <Text variant="body-1">Overview tab content</Text>
            </div>
          </Tabs.TabContent>
          <Tabs.TabContent id="details">
            <div className="rounded-md border border-gray-200 bg-white p-4">
              <Text variant="body-1">Details tab content</Text>
            </div>
          </Tabs.TabContent>
          <Tabs.TabContent id="settings">
            <div className="rounded-md border border-gray-200 bg-white p-4">
              <Text variant="body-1">Settings tab content</Text>
            </div>
          </Tabs.TabContent>
        </Tabs>
      </Section>

      <Section title="TabGroup">
        <TabGroup tabs={tabDefs} currentTab={tabGroupTab} setCurrentTab={setTabGroupTab} />
        <Text variant="body-2" className="text-gray-500">
          Selected: {tabGroupTab}
        </Text>
      </Section>

      <Divider />

      {/* Collapsible */}
      <Section title="Collapsible">
        <Collapsible title="Click to expand">
          <div className="p-3 text-sm text-gray-600">
            This content is inside a collapsible container. It can be toggled open and closed.
          </div>
        </Collapsible>
        <Collapsible title="Starts open" defaultOpen>
          <div className="p-3 text-sm text-gray-600">
            This collapsible starts in the open state.
          </div>
        </Collapsible>
      </Section>

      <Section title="CollapsibleSection">
        <CollapsibleSection defaultOpen>
          <CollapsibleSection.ToggleButton>
            <Text variant="title-3">Toggle Section</Text>
          </CollapsibleSection.ToggleButton>
          <CollapsibleSection.Content>
            <div className="p-3 text-sm text-gray-600">
              CollapsibleSection uses a compound component pattern.
            </div>
          </CollapsibleSection.Content>
        </CollapsibleSection>
      </Section>

      <Divider />

      {/* Copyable */}
      <Section title="Copyable">
        <div className="flex items-center gap-4">
          <Copyable value="hello@candidhealth.com">
            <Text variant="body-1" className="text-indigo-600 cursor-pointer">
              hello@candidhealth.com
            </Text>
          </Copyable>
        </div>
      </Section>

      {/* Header Tile */}
      <Section title="HeaderTile">
        <div className="flex gap-4">
          <HeaderTile title="Total Claims" content={<Text variant="title-1">1,234</Text>} />
          <HeaderTile title="Pending" content={<Text variant="title-1">56</Text>} />
          <HeaderTile title="Revenue" content={<Text variant="title-1">$89,012</Text>} />
        </div>
      </Section>

      <Divider />

      {/* Tooltip */}
      <Section title="Tooltip">
        <div className="flex gap-6">
          <Tooltip
            trigger={<span className="cursor-pointer text-sm text-indigo-600 underline">Hover me</span>}
            content="Default tooltip"
          />
          <Tooltip
            trigger={<Button size="sm" intent="default">Button with Tooltip</Button>}
            content="Another tooltip with more content that wraps to multiple lines if needed"
          />
        </div>
      </Section>

      {/* Menu */}
      <Section title="Menu">
        <Menu disabled={false}>
          <Menu.Item>Edit</Menu.Item>
          <Menu.Item>Duplicate</Menu.Item>
          <Menu.Separator />
          <Menu.Item>Delete</Menu.Item>
        </Menu>
      </Section>

      {/* Modal */}
      <Section title="Modal">
        <Button intent="primary" onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Body
            title="Example Modal"
            description="This is a modal dialog. It can contain any content."
            actions={
              <div className="flex gap-2">
                <Button intent="default" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button intent="primary" onClick={() => setModalOpen(false)}>
                  Confirm
                </Button>
              </div>
            }
          />
        </Modal>
      </Section>

      <Divider />

      {/* Dropdown Chevron */}
      <Section title="DropdownChevron">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Dropdown indicator icon:</span>
          <DropdownChevron />
        </div>
      </Section>

      <Divider />

      {/* Loading States */}
      <Section title="Loaders">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Text variant="label" className="w-28">Spinner:</Text>
            <Spinner />
          </div>
          <div className="flex items-center gap-4">
            <Text variant="label" className="w-28">LoadingState:</Text>
            <div className="h-20 w-40">
              <LoadingState />
            </div>
          </div>
          <div className="space-y-1">
            <Text variant="label">LoadingBar:</Text>
            <LoadingBar />
          </div>
        </div>
      </Section>

      <Section title="Skeleton">
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-10 w-full" />
        </div>
      </Section>

      <Divider />

      {/* Form */}
      <FormDemo />

      <Divider />

      {/* Empty State */}
      <Section title="EmptyState">
        <EmptyState title="No results found" description="Try adjusting your search or filters." />
      </Section>
    </div>
  );
}

export default App;
