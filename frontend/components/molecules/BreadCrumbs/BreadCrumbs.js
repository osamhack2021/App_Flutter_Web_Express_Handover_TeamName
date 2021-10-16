import { mdiChevronRight } from "@mdi/js";
import { Icon } from "@mdi/react";
import { Breadcrumbs, Button, Skeleton, Stack } from "@mui/material";
import React from "react";
import LinkComponent from "_atoms/LinkComponent";
import TypeIcon from "_atoms/TypeIcon";

const BreadCrumbItem = ({ item = null }) => {
  return (
    <Button
      variant="text"
      size="small"
      sx={{ width: item != null ? "auto" : "100px", textTransform: "none" }}
      component={item != null ? LinkComponent : null}
      to={item != null ? `/item/${item._id}` : null}
    >
      <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
        {item != null ? <TypeIcon type={item.type} size={0.75} /> : null}
        {item != null ? (
          <div className="breadcrumb-text">{item.title}</div>
        ) : (
          <Skeleton width="100%" />
        )}
      </Stack>
    </Button>
  );
};

export default function BreadCrumbs({ itemArray = null, hierarchyLevel = 3 }) {
  return (
    <Breadcrumbs
      sx={{
        ".MuiBreadcrumbs-separator": { margin: 0 },
      }}
      separator={<Icon path={mdiChevronRight} size={0.75} />}
    >
      {itemArray != null
        ? itemArray.map((item, index) => (
            <BreadCrumbItem item={item} key={index} />
          ))
        : [...Array(hierarchyLevel).keys()].map((i, index) => (
            <BreadCrumbItem key={index} />
          ))}
    </Breadcrumbs>
  );
}