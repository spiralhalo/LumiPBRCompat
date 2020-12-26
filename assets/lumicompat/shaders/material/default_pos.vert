#include frex:shaders/api/vertex.glsl

/******************************************************
  lumicompat:shaders/material/default_pos.vert
******************************************************/

void frx_startVertex(inout frx_VertexData data) {
#ifdef LUMI_BUMP
    bump_resolution = 1.0;
    frx_var1.zw = data.spriteUV;
#endif
    frx_var2 = data.vertex;
}

void frx_endVertex(inout frx_VertexData data) {
#ifdef LUMI_BUMP
    frx_var0.xy = uvN;
    frx_var0.zw = uvT;
    frx_var1.xy = uvB;
#endif
}
