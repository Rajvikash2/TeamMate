import React from "react";
import { Box, Card, Grid, Inset, Strong, Text } from "@radix-ui/themes";
import { Title } from "@radix-ui/themes/dist/cjs/components/alert-dialog";
import Link from "next/link";
const PostCard = ({ post }) => {
  return (
    <Box maxWidth="340px" key={post.id}>
      <Card size="2">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>

        <Link href="/about">
          <Grid rows="1" gap="2">
            <h3 className="">{post.title}</h3>
            <p>{post.desc}</p>
            {/* <Grid columns="2" gap="2"> */}
            <h3>
              Domain :{" "}
              <span className="bg-lime-100 text-green-700 p-1 rounded-full">
                {post.domain}
              </span>
            </h3>
            {/* <h3>rolereq</h3> */}
            <ul>
              <li>RoleReq</li>
              {post.roleReq.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
            {/* </Grid> */}
          </Grid>
        </Link>

        {/* button view */}
      </Card>
    </Box>
  );
};

export default PostCard;
