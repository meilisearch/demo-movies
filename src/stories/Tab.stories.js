import React from 'react'
import { useTabState } from 'reakit/Tab'
import { Tab, TabList, TabPanel } from 'components/Tab'
import Typography from 'components/Typography'

export default {
  title: 'Components/Tab',
}

export const Default = () => {
  const tab = useTabState()
  return (
    <>
      <TabList {...tab} aria-label="My tabs">
        <Tab {...tab} id="overview">
          <Typography variant="typo1">Overview</Typography>
        </Tab>
        <Tab {...tab} id="whereTowatch">
          <Typography variant="typo1">Where to Watch</Typography>
        </Tab>
      </TabList>
      <div style={{ marginTop: 24 }}>
        <TabPanel {...tab}>
          <Typography>Tab 1</Typography>
        </TabPanel>
        <TabPanel {...tab}>
          <Typography>Tab 2</Typography>
        </TabPanel>
      </div>
    </>
  )
}
