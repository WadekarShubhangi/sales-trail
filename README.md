# SalesTrail - Sales Lead Management App

SalesTrail is a full-stack sales lead management application where users can create, track, and manage leads effectively.  
It provides features like adding and editing leads, assigning sales agents, adding tags and comments, and generating reports.  
The app is built with React (frontend), Node.js/Express (backend), MongoDB database, and uses Chart.js for reporting.

---

## Demo Link

- [Live Demo](https://sales-trail-ccia.vercel.app/)

---

## Quick Start

```
git clone https://github.com/WadekarShubhangi/sales-trail.git
cd sales-trail
npm install
npm run dev
```

---

## Technologies

- React JS
- Node JS
- Express JS
- MongoDB
- React Router
- Chart.js

---

## Demo Video

Watch a Walkthrough (8 mins) of all the major features of this app:
[Demo Video](https://drive.google.com/file/d/1Q93hGqDZ49ZD-NQDfR7blc2fvMtnkfxo/view?usp=sharing)

---

## Features

**Dashboard/Home**

- View all leads in a table format
- See lead status summary (Qualified, Closed, New, Proposal Sent)
- Apply quick filters to leads based on their status
- Add new leads directly from the dashboard

**Leads**

- View complete list of all leads
- Apply filters to narrow down leads based on status or other criteria
- Add new lead button
- click on any lead to see the details of the perticular leads

**LeadDetails**

- View complete details of a selected lead (name, sales agent, tags, etc..)
- Edit lead information using the Edit Lead button
- Delete a lead using delete button
- View all comments related to the lead, including author and timestamp
- Add new comments with a simple input form

**Sales Agent**

- View complete list of all sales agents
- Display basic details of agents (Name, Email)
- Add a new sales agent directly using the Add New Agent button

**Report**

- Show total leads comparison (Closed vs In Pipeline) using Pie Chart
- Display number of leads closed by each sales agent using Bar Chart
- Visualize distribution of leads by status (New, Contacted, etc.) using Pie Chart.

**Lead Status View**

- Multi-Filter Support – Filter leads by status, priority, sales agent.
- Sorting – Sort leads by time to close (Low→High / High→Low).
- Displays Lead Name, Agent, Time to Close, Status.

**Sales Agent View**

- Filter leads by sales agent, priority, and status.
- Sort leads by time to close (Low→High / High→Low).
- Displays Lead Number, Lead Name, Lead Status, and Priority Badge.
- Visual priority indicators (High - Red, Medium - Yellow, Low - Green).

**Add / edit lead form**

- Add a new lead or edit existing lead details with a single form.
- Assign sales agents and set lead status, priority, source, and tags, etc.
- Set expected time to close for each lead.
- Form auto-populates when editing a lead for easy updates.

**Add Agents**

- Add a new sales agent with name and email.

---

## API Reference

### **GET /leads**<br>
Get all leads <br>
[Live Endpoint](https://sales-trail.vercel.app/leads)<br>
Sample Response: <br>

```
{leads: [{_id,name,source,salesAgent:{_id,name,email},status,tags,timeToClose,priority,createdAt,updatedAt}]}


```

### POST /leads<br>
Add a new lead<br>
[Live Endpoint](https://sales-trail.vercel.app/leads/:id)<br>
Sample Response:<br>
```
{lead: {_id,name,source,salesAgent:{_id,name,email},status,tags,timeToClose,priority,createdAt,updatedAt}}
```

### PATCH /leads/:id<br>
Update an existing lead<br>
[Live Endpoint](https://sales-trail.vercel.app/leads/:id)<br>
Sample Response:<br>

```
{message, lead: {_id,name,source,salesAgent:{_id,name,email},status,tags,timeToClose,priority,createdAt,updatedAt}}
```


### DELETE /leads/:id<br>
Delete an existing lead<br>
[Live Endpoint](https://sales-trail.vercel.app/leads/:id)<br>
Sample Response:<br>
```
{message:"lead deleted successfully."}

```

### GET /leads/:id/comments<br>
Get all comments for a specific lead<br>
[Live Endpoint](https://sales-trail.vercel.app/leads/:id/comments)<br>
Sample Response:<br>
```
{comments: [{_id,lead:{_id,name},author:{_id,name,email},commentText,createdAt,updatedAt}]}

```

### POST /leads/:id/comments<br>
Add a new comment to a specific lead<br>
[Live Endpoint](https://sales-trail.vercel.app/leads/:id/comments)<br>
Sample Response:<br>
```
{comment: {_id,lead:{_id,name},author:{_id,name,email},commentText,createdAt,updatedAt}}

```

### GET /report/last-week<br>
Get leads closed in the last 7 days<br>
[Live Endpoint](https://sales-trail.vercel.app/report/last-week)<br>
Sample Response:<br>
```
{leads: [{_id,name,source,salesAgent:{_id,name,email},status,tags,timeToClose,priority,createdAt,updatedAt}]}

```


### GET /report/pipeline<br>
Get all leads currently in pipeline (status not Closed)<br>
[Live Endpoint](https://sales-trail.vercel.app/report/pipeline)<br>
Sample Response:<br>
```
{leads: [{_id,name,source,salesAgent:{_id,name,email},status,tags,timeToClose,priority,createdAt,updatedAt}]}

```

### GET /report/closed-by-agent<br>
Get number of leads closed by each sales agent<br>
[Live Endpoint](https://sales-trail.vercel.app/report/closed-by-agent)<br>
Sample Response:<br>
```
[{_id,closedLeads}]
```


### GET /agents<br>

Get all sales agents<br>
[Live Endpoint](https://sales-trail.vercel.app/agents)<br>
Sample Response:<br>
```
{agents: [{_id,name,email,createdAt,updatedAt}]}
```

### POST /agents<br>
Add a new sales agent<br>
[Live Endpoint](https://sales-trail.vercel.app/agents)<br>
Sample Response:<br>
```
{message,newAgent:{_id,name,email,createdAt,updatedAt}}
```


### GET /tags<br>

Get all tags<br>
[Live Endpoint](https://sales-trail.vercel.app/tags) <br>
Sample Response:<br>
```
{tags: [{_id,name,createdAt,updatedAt}]}
```

### POST /tags<br>
Add a new tag <br>
[Live Endpoint](https://sales-trail.vercel.app/tags)<br>
Sample Response:<br>
```
{message,tag:{_id,name,createdAt,updatedAt}}
```


## Contact

For bugs or feature request, please reach out to shubhangiwadekar1096@gmail.com
