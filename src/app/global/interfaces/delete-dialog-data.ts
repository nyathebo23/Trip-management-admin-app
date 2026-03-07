interface DeleteDialogData {
    title: string,
    entityName: string,
    objectId: string,
    deleteFunction: (id: string) => void
}