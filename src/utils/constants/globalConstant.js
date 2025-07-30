export const AddAutomationWorkflow = [
    {
        label: "Parent Id",
        name: "parent_id",
        type: "text",
        placeholder: "Enter your parent ID",
        validation: { required: true, maxLength: 50 },
    },
    {
        label: "Dag Name",
        name: "dag_name",
        type: "text",
        placeholder: "Enter your dag name",
        validation: { required: true, maxLength: 50 },
    },
    {
        label: "Schedule Cron",
        name: "schedule_cron",
        type: "text",
        placeholder: "Enter your schedule cron",
        validation: { required: false, maxLength: 50 },
    },
    {
        label: "Source Creds ID",
        name: "source_creds_id",
        type: "text",
        placeholder: "Enter your Source Creds ID",
        validation: { required: false, maxLength: 50 },
    },
    {
        label: "Destination Creds ID",
        name: "destination_creds_id",
        type: "text",
        placeholder: "Enter your Destination Creds ID",
        validation: { required: false, maxLength: 50 },
    },
    // {
    //     label: "Destination dropdown",
    //     name: "destination_creds_dropdown",
    //     type: "dropdown",
    //     placeholder: "",
    //     validation: { required: false, maxLength: 50 },
    // },
    {
        label: "Schedule Type",
        name: "schedule_type",
        type: "text",
        placeholder: "Enter schedule type",
        validation: { required: false, maxLength: 50 },
    }

];

export const credsFormConfig = [
    { label: "Credential Name", name: "cred_name", type: "text", placeholder: "Enter credential name", validation: { required: true } },
    {
        label: "Credential Type", name: "cred_type", type: "dropdown", options: [{ value: "api", label: "api" }], validation: { required: true }
    },
    { label: "Credential Purpose", name: "cred_purpose", type: "dropdown", options: [{ value: "source", label: "source" }, { value: "destination", label: "destination" }], validation: { required: true } },
];

export const sourceDestConfig = [
    { label: "Cred ID", name: "cred_id", type: "number", placeholder: "Enter cred ID", validation: { required: true } },
    { label: "API URL", name: "api_url", type: "text", placeholder: "Enter API URL", validation: { required: true } },
    { label: "API Username", name: "api_username", type: "text", placeholder: "Enter Username", validation: { required: false } },
    { label: "API Password", name: "api_password", type: "password", placeholder: "Enter Password", validation: { required: false } },
    { label: "File Type", name: "file_type", type: "text", placeholder: "Enter file type", validation: { required: false } },
];

export const getCredentialFormConfig = (credType = "api") => {
    const baseFields = [
        { label: "Credential Name", name: "cred_name", type: "text", placeholder: "Enter credential name", validation: { required: true } },
        {
            label: "Credential Type", name: "cred_type", type: "dropdown", options: [{ value: "api", label: "api" }], defaultValue: credType, validation: { required: true }
        },
        { label: "Credential Purpose", name: "cred_purpose", type: "dropdown", options: [{ value: "source", label: "source" }, { value: "destination", label: "destination" }], validation: { required: true } },
    ];

    // const dbFields = [
    //     { label: "DB Type", name: "db_type", type: "text", placeholder: "Enter DB type", validation: { required: true } },
    //     { label: "IP Address", name: "ip", type: "text", placeholder: "Enter IP", validation: { required: true } },
    //     { label: "Port", name: "port", type: "number", placeholder: "Enter Port", validation: { required: true } },
    //     { label: "Username", name: "username", type: "text", placeholder: "Enter Username", validation: { required: true } },
    //     { label: "Password", name: "password", type: "password", placeholder: "Enter Password", validation: { required: true } },
    //     { label: "DB Name", name: "db_name", type: "text", placeholder: "Enter DB Name", validation: { required: true } },
    //     { label: "Table Name", name: "table_name", type: "text", placeholder: "Enter Table Name", validation: { required: true } },
    // ];

    const apiFields = [
        { label: "API URL", name: "api_url", type: "text", placeholder: "Enter API URL", validation: { required: true } },
        { label: "API Username", name: "api_username", type: "text", placeholder: "Enter Username", validation: { required: false } },
        { label: "API Password", name: "api_password", type: "password", placeholder: "Enter Password", validation: { required: false } },
    ];

    // const sftpFields = [
    //     { label: "SFTP IP", name: "sftp_ip", type: "text", placeholder: "Enter SFTP IP", validation: { required: true } },
    //     { label: "SFTP Port", name: "sftp_port", type: "number", placeholder: "Enter Port", validation: { required: true } },
    //     { label: "SFTP Username", name: "sftp_username", type: "text", placeholder: "Enter Username", validation: { required: true } },
    //     { label: "SFTP Password", name: "sftp_password", type: "password", placeholder: "Enter Password", validation: { required: true } },
    //     { label: "SFTP Folder", name: "sftp_folder", type: "text", placeholder: "Enter Folder Path", validation: { required: false } },
    // ];

    const extraFields = {
        // db: dbFields,
        api: apiFields,
        // sftp: sftpFields,
    };

    return [...baseFields, ...(extraFields[credType] || [])];
};



