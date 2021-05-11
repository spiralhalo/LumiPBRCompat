#include frex:shaders/api/fragment.glsl
#include frex:shaders/api/world.glsl
#include lumiext:shaders/lib/bump.glsl
#include lumiext:shaders/internal/frag.glsl

/******************************************************
  lumicompat:shaders/material/adorn/lamp.frag
******************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
    if (frx_modelOriginType() == MODEL_ORIGIN_REGION) {
        vec3 pos = frx_var2.xyz;
        vec3 magA = 2.0 * abs(0.5 - fract(pos));
        float mag = max(magA.x, max(magA.y, magA.z));
        data.emissivity = smoothstep(0.3, 1.0, 1.0 - mag * mag);
    }

#ifdef LUMIEXT_ApplyBumpDefault
    _applyBump(data);
    // data.spriteColor.rgb *= (data.vertexNormal + 1) * 0.5;
#endif
}
